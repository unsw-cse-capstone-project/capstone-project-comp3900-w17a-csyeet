from datetime import datetime
from pydantic import BaseModel, Field


class BidBase(BaseModel):
    bid: int = Field(..., ge=1)


class BidRequest(BidBase):
    pass


class BidResponse(BidBase):
    bidder_id: int
    placed_at: datetime
    reserve_met: bool

class PlaceBidResponse(BidResponse):
    auction_end: datetime
