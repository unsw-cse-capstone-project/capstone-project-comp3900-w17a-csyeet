from datetime import datetime
from dataclasses import asdict
from typing import Optional, List, Set, Dict
from functools import reduce
from itertools import count
import numpy as np
import pandas as pd
from sklearn.preprocessing import MinMaxScaler
from sklearn.neighbors import NearestNeighbors
from sqlalchemy.orm import Session
from ..schemas import field_to_feature_map, ListingType, Feature, SearchListingsRequest
from ..models import Interaction, InteractionType, Listing, User
from .common import session_maker
from .listing import get_field_for_feature
from .geolocation import convert_address_to_postcode

prefix_sep = '='


def column_name(key: str, value: str) -> str:
    return key + prefix_sep + value


ammenities_similarity_fields = [
    'num_bedrooms', 'num_bathrooms', 'num_car_spaces']
base_similarity_fields = ammenities_similarity_fields + ['type', 'postcode']
request_similarity_fields = base_similarity_fields + ['features']
listing_similarity_fields = base_similarity_fields + \
    list(field_to_feature_map.keys())


def filter_similarity_fields(listing_dict: dict) -> dict:
    return {key: listing_dict[key] for key in listing_similarity_fields}


db_data = []
data_index_by_id: Dict[int, int] = {}
data_frame: pd.DataFrame = None
one_hot_encoded_types: pd.DataFrame = None
# scales all values down to the range [-1, 1]
scaler = MinMaxScaler(feature_range=(-1, 1), copy=False)
nn = NearestNeighbors()


def initialise_ML_model():
    with session_maker.context_session() as session:
        session: Session
        # don't recommend closed listings
        global db_data
        db_data = session.query(Listing) \
            .filter(Listing.auction_end > datetime.now()) \
            .all()
        train_model(session)


def add_listing_to_ML_model(listing: Listing, session: Session):
    global db_data
    db_data.append(listing)
    train_model(session)


def get_listing_index_in_data(listing: Listing) -> Optional[int]:
    return data_index_by_id.get(listing.id)


def update_listing_in_ML_model(listing: Listing, session: Session):
    global db_data
    index = get_listing_index_in_data(listing)
    if index is not None:
        db_data[index] = listing
        train_model(session)


def remove_listing_from_ML_model(listing: Listing, session: Session):
    global db_data
    # listing may have changed so remove it by id
    index = get_listing_index_in_data(listing)
    if index is not None:
        del db_data[index]
        train_model(session)


def train_model(session: Session):
    if len(db_data) == 0:
        return  # no listings to suggest

    global data_index_by_id, data_frame, one_hot_encoded_types
    filtered_data = []
    for index, listing in enumerate(db_data):
        # listings from a previous session need to be refreshed before serialisation
        listing_dict = asdict(session.merge(listing))
        data_index_by_id[listing_dict['id']] = index
        filtered_data.append(filter_similarity_fields(listing_dict))
    data_frame = pd.DataFrame.from_dict(filtered_data)

    # add rows to data where enum value not present - set all other fields to 0
    listing_types_data = data_frame['type']
    missing_listing_types = set(ListingType) - set(listing_types_data)
    if len(missing_listing_types) >= 0:
        listing_types_data = pd.concat([listing_types_data] + [pd.Series({'type': missing_type}) for missing_type in missing_listing_types],
                                       ignore_index=True)
    # convert the single column types into a matrix of {0|1} values for whether the row is of that type
    one_hot_encoded_types = pd.get_dummies(listing_types_data, prefix='type',
                                           prefix_sep=prefix_sep)
    data_frame = data_frame.drop(columns='type', axis=1)
    # append the extra columns, ignoring the extra rows
    data_frame = data_frame.join(one_hot_encoded_types)
    X = data_frame.to_numpy()
    print(X)
    X_scaled = scaler.fit_transform(X)
    print(X_scaled)
    nn.fit(scale_location(X_scaled))


def scale_location(scaled: np.ndarray) -> np.ndarray:
    postcode_index = list(data_frame.columns).index('postcode')
    # increase the weighting of location by scaling values to [-3, 3]
    scaled[..., postcode_index] = scaled[..., postcode_index] * 3
    return scaled


def convert_interactions(interactions: List[Interaction], users_country: str):
    # set all the values from the interaction into the frame
    rows = []
    for interaction in interactions:
        if interaction.type == InteractionType.search:
            # if an attirbute was not specified in the query we need to (ideally) indicate 'no preference' to that characteristic
            # for binary/boolean data 0.5 indicates this, while for numeric data the best we can do is the median
            column_mapping = {key: interaction.search_query[key] if interaction.search_query[key] else data_frame[key].median()
                              for key in ammenities_similarity_fields}

            if interaction.search_query["type"]:
                column_mapping[column_name('type', interaction.search_query['type'])] = 1  # nopep8
            else:
                for listing_type_column in one_hot_encoded_types.columns:
                    column_mapping[listing_type_column] = 0.5

            # assume no preference
            postcode_value = data_frame['postcode'].median()
            queried_location: str = interaction.search_query["location"]
            if queried_location:
                # if the user didn't query a postcode, try convert it to one
                if not queried_location.isdigit():
                    # assist the geocoding by adding the user's country
                    restricted_location = f'{queried_location}, {users_country}'
                    potential_postcode = convert_address_to_postcode(restricted_location)  # nopep8
                    if potential_postcode and potential_postcode.isdigit():
                        postcode_value = potential_postcode
            column_mapping['postcode'] = postcode_value

            requested_features = interaction.search_query['features'] or []
            has_feature_preference = len(requested_features) > 0
            for feature in Feature:
                value = 0.5  # no preference
                if has_feature_preference:
                    value = int(feature in requested_features)
                column_mapping[get_field_for_feature(feature)] = value

            rows.append(column_mapping)
        else:
            column_mapping = filter_similarity_fields(asdict(interaction.listing))   # nopep8
            listing_type = column_mapping.pop('type')
            column_mapping[column_name('type', listing_type)] = 1
            rows.append(column_mapping)
    df = pd.DataFrame.from_dict(rows).fillna(0)
    # then re-index it based on the original frame for fitting
    df = df.reindex(columns=data_frame.columns, fill_value=0, copy=False)
    print(df)
    scaled = scaler.transform(df.to_numpy())
    return scale_location(scaled)


def recommend_from_interactions(user: User, session: Session) -> List[Listing]:
    if len(db_data) == 0:
        return []  # no listings to suggest

    # fetch the user's most recent interactions
    interactions = session.query(Interaction) \
        .filter_by(user_id=user.id) \
        .order_by(Interaction.timestamp.desc()) \
        .all()  # TODO: maybe add a limit of 50?
    if len(interactions) == 0:
        # if the user hasn't interacted with anything, recommend based on their location
        postcode_query = {key: (None if key != 'location' else user.postcode)
                          for key in SearchListingsRequest.__pydantic_model__.schema()['properties'].keys()}
        interactions = [Interaction(type=InteractionType.search, search_query=postcode_query,
                                    timestamp=datetime.now(), user_id=user.id)]
    print([i.listing_id if i.listing_id else i.search_query['location']
           for i in interactions], flush=True)
    encoded_interactions = convert_interactions(interactions, user.country)
    print(encoded_interactions)
    # interactions are generally for similar listings, if the number of interacted listings is high,
    # it's likely we'll filter out quite a few neighbours, so we should search for more
    # TODO: craft formula after have test data: min(10, (5/2)/total_similarity), where total_similarity ∈ (0,1]
    num_neighbours = min(len(data_frame), 10)
    (distance_matrix, neighbour_index_matrix) = nn.kneighbors(encoded_interactions, num_neighbours)  # nopep8
    print(distance_matrix, neighbour_index_matrix)
    # process the results
    interacted_listings = {i.listing_id for i in interactions if i.listing_id is not None}  # nopep8
    flattened_distances = []
    flattened_neighbour_indexes = []
    for i, distances, neighbour_indexes in zip(count(), distance_matrix, neighbour_index_matrix):
        distance_row = distances
        neighbour_index_row = neighbour_indexes
        if len(interacted_listings) > 0:
            # remove all listings that have already been interacted with from the recommendations
            indexes = np.argwhere(reduce(lambda acc, listing_id: acc | (neighbour_indexes == data_index_by_id.get(listing_id)),
                                         interacted_listings, neighbour_indexes == -1))
            neighbour_index_row = np.delete(neighbour_indexes, indexes)
            distance_row = np.delete(distances, indexes)

        print(distance_row, neighbour_index_row, end=' -> ')
        # give more weight to more recent interactions by distancing older interactions
        distance_row = distance_row + i
        print(distance_row, neighbour_index_row)

        flattened_distances.extend(distance_row.flatten())
        flattened_neighbour_indexes.extend(neighbour_index_row.flatten())

    # sort the flattened pairs by distance in ascending order
    closest_neighbour_pairs = sorted(zip(flattened_distances, flattened_neighbour_indexes),
                                     key=lambda pair: pair[0])
    print(closest_neighbour_pairs)
    # choose 5 closest unique neighbours across all interactions
    max_num_recommendations = 5
    seen_neighbour_indexes: Set[int] = set()
    closest_neighbour_indexes: List[int] = []
    index = 0
    while len(closest_neighbour_indexes) < max_num_recommendations and index < len(closest_neighbour_pairs):
        _, neighbour_index = closest_neighbour_pairs[index]
        if neighbour_index not in seen_neighbour_indexes:
            seen_neighbour_indexes.add(neighbour_index)
            closest_neighbour_indexes.append(neighbour_index)
        index += 1
    print(closest_neighbour_indexes)
    # return the closest neighbours - i.e. similar listings
    similar_listings = []
    for index in closest_neighbour_indexes:
        listing = db_data[index]
        # reattach it to the session
        similar_listings.append(session.merge(listing))
    return similar_listings
