import base64
from datetime import datetime, timedelta
from dataclasses import asdict
from typing import List, Optional, Tuple
from sqlalchemy.orm import Session
from ..schemas import ListingResponse, Feature, field_to_feature_map
from ..models import Listing, User, Starred, Registration
from .bid import get_highest_bid


def encode_continuation(results: List[Listing], limit: int) -> Optional[str]:
    return base64.urlsafe_b64encode(str(results[-1].id).encode()).decode() if len(results) == limit else None


def decode_continuation(continuation: str) -> Tuple[int]:
    return int(base64.urlsafe_b64decode(continuation).decode()),


def map_listing_to_response(listing: Listing, highest_bid: Optional[int], starred: bool, registered_bidder: bool) -> ListingResponse:
    response = asdict(listing)
    response['owner'] = listing.owner
    response['highest_bid'] = highest_bid
    response['reserve_met'] = highest_bid is not None and highest_bid >= listing.reserve_price
    response['landmarks'] = listing.landmarks
    response['image_ids'] = [image.id for image in listing.images]
    response['features'] = []
    for field, feature in field_to_feature_map.items():
        if response[field]:
            response['features'].append(feature)
        response.pop(field)
    response['starred'] = starred
    response['registered_bidder'] = registered_bidder
    return response  # type: ignore


def map_listing_response(listing, current_user: Optional[User], session: Session) -> ListingResponse:
    highest_bid = get_highest_bid(listing.id, session)
    starred = is_listing_starred(listing, current_user, session)
    registered_bidder = is_user_registered_bidder(
        listing, current_user, session)
    return map_listing_to_response(listing, highest_bid, starred, registered_bidder)


def get_field_for_feature(feature: Feature) -> str:
    keys = list(field_to_feature_map.keys())
    values = list(field_to_feature_map.values())
    return keys[values.index(feature)]


def get_auction_time_remaining(listing: Listing) -> timedelta:
    return listing.auction_end - datetime.now()


def is_listing_starred(listing: Listing, user: Optional[User], session: Session) -> bool:
    if user is None:
        return False
    return session.query(Starred).get((listing.id, user.id)) is not None


def is_user_registered_bidder(listing: Listing, user: Optional[User], session: Session) -> bool:
    if user is None:
        return False
    return session.query(Registration).get((listing.id, user.id)) is not None
