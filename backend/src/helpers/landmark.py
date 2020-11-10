import os
from distutils.util import strtobool
from decimal import Decimal
from typing import List, Tuple
import googlemaps
from googlemaps.places import places_nearby
from geopy.distance import distance
from ..models import Listing, Landmark
from ..schemas import LandmarkType
from .geolocation import get_listing_coordinates

# consider: https://pydantic-docs.helpmanual.io/usage/settings/#dotenv-env-support
gmaps_client = googlemaps.Client(key='AIzaSyDakTtp6izOGX7zI_rWxT3a8E6rCX1gaso')
search_places = bool(strtobool(os.getenv('SEARCH_PLACES', '0')))


def find_nearby_landmarks(listing: Listing) -> List[Landmark]:
    landmarks = []
    # TODO: remove me - only use real APIs if the environment variable is set, otherwise return dummy results
    if search_places:
        listing_coordinates = get_listing_coordinates(listing)
        if listing_coordinates is not None:
            for landmark_type in LandmarkType:
                response = places_nearby(gmaps_client, location=listing_coordinates,
                                         radius=3000, type=landmark_type.name)
                landmarks += [create_landmark(place, landmark_type, listing, listing_coordinates)
                              for place in filter_places_response(response, landmark_type)]
    else:
        landmarks += [
            Landmark(listing_id=listing.id, name="Primary School",
                     type=LandmarkType.primary_school, distance=Decimal('2.21')),
            Landmark(listing_id=listing.id, name="Secondary School",
                     type=LandmarkType.secondary_school, distance=Decimal('2.01')),
            Landmark(listing_id=listing.id, name="Park",
                     type=LandmarkType.park, distance=Decimal('1.01')),
            Landmark(listing_id=listing.id, name="Train Station",
                     type=LandmarkType.train_station, distance=Decimal('0.91')),
        ]
    return landmarks


max_landmarks_per_type = 10
acceptable_park_landmark_types = set(
    ['park', 'point_of_interest', 'establishment', 'tourist_attraction', 'campground', 'rv_park'])


def filter_places_response(response, landmark_type: LandmarkType):
    results = response['results']
    if landmark_type == LandmarkType.park:
        # Google Places has some incorrect results for parks, such as stores
        # so we only allow results whose types are all acceptable for parks
        results = [r for r in results
                   if set(r['types']).issubset(acceptable_park_landmark_types)]
    return results[:max_landmarks_per_type]


def create_landmark(place, landmark_type: LandmarkType, listing: Listing, listing_coordinates: Tuple[float, float]) -> Landmark:
    place_location = place['geometry']['location']
    place_coordinates = (place_location['lat'], place_location['lng'])
    km_to_landmark = distance(listing_coordinates, place_coordinates).km
    return Landmark(listing_id=listing.id, name=place['name'],
                    type=landmark_type, distance=Decimal(km_to_landmark))
