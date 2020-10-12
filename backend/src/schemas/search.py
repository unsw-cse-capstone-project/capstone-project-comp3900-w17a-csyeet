from pydantic import BaseModel, Field
from datetime import datetime
from typing import List
from .listing import ListingType

class ListingSearchResult(BaseModel):
    id: str
    type: ListingType
    title: str
    description: str
    street: str
    suburb: str
    postcode: str
    state: str
    country: str
    num_bedrooms: int = Field(..., ge=0)
    num_bathrooms: int = Field(..., ge=0)
    num_car_spaces: int = Field(..., ge=0)
    auction_start: datetime
    auction_end: datetime

class SearchRequest(BaseModel):
    location: str

class SearchResponse(BaseModel):
    result: List[ListingSearchResult]
