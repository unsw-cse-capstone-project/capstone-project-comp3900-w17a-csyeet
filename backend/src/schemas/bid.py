from datetime import datetime
from pydantic import BaseModel, Field


class BidBase(BaseModel):
    bid: int = Field(..., ge=1)


class BidRequest(BidBase):
    pass


class BidResponse(BidBase):
    user_id: int
    placed_at: datetime
    time_remaining: datetime
