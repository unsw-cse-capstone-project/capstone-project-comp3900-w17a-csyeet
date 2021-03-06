from dataclasses import asdict
from typing import Optional
from sqlalchemy.orm import Session
from ..models import Bid, Listing
from ..schemas import BidResponse


def get_highest_bid(listing_id: int, session: Session) -> Optional[Bid]:
    return session.query(Bid) \
        .filter_by(listing_id=listing_id) \
        .order_by(Bid.bid.desc(), Bid.placed_at.asc()) \
        .first()


def map_bid_to_response(bid: Bid, listing: Listing) -> BidResponse:
    response = asdict(bid)
    response['auction_end'] = listing.auction_end
    response['reserve_met'] = bid.bid >= listing.reserve_price
    return response  # type: ignore
