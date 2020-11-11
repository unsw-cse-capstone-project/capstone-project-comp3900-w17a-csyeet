from datetime import datetime
from enum import auto
from typing import List, Optional
from pydantic import BaseModel, Field
from pydantic.dataclasses import dataclass
from fastapi import Query
from fastapi_utils.enums import CamelStrEnum
from .common import UserResponse
from .bid import BidResponse
from .landmark import LandmarkReponse, LandmarkType


class ListingType(CamelStrEnum):
    house = auto()
    apartment = auto()
    townhouse = auto()
    studio = auto()
    duplex = auto()


class Feature(CamelStrEnum):
    ensuite = auto()
    built_in_wardrobe = auto()
    bathtub = auto()
    furnished = auto()
    open_kitchen = auto()
    separate_kitchen = auto()
    island_kitchen = auto()
    gas_stove = auto()
    electric_stove = auto()
    induction_stove = auto()
    balcony = auto()
    ocean_view = auto()
    bbq = auto()
    porch = auto()
    pool = auto()
    gym = auto()


field_to_feature_map = {
    'has_ensuite': Feature.ensuite,
    'has_built_in_wardrobe': Feature.built_in_wardrobe,
    'has_bathtub': Feature.bathtub,
    'is_furnished': Feature.furnished,
    'has_open_kitchen': Feature.open_kitchen,
    'has_separate_kitchen': Feature.separate_kitchen,
    'has_island_kitchen': Feature.island_kitchen,
    'has_gas_stove': Feature.gas_stove,
    'has_electric_stove': Feature.electric_stove,
    'has_induction_stove': Feature.induction_stove,
    'has_balcony': Feature.balcony,
    'has_ocean_view': Feature.ocean_view,
    'has_bbq': Feature.bbq,
    'has_porch': Feature.porch,
    'has_pool': Feature.pool,
    'has_gym': Feature.gym,
}


class ListingBase(BaseModel):
    type: ListingType
    title: str
    description: str
    street: str
    suburb: str
    postcode: str
    state: str
    country: str
    num_bedrooms: int = Field(..., ge=1)
    num_bathrooms: int = Field(..., ge=1)
    num_car_spaces: int = Field(..., ge=0)
    auction_start: datetime
    auction_end: datetime
    features: List[Feature]


class CreateListingRequest(ListingBase):
    reserve_price: int = Field(..., ge=1)
    account_name: str
    bsb: str
    account_number: str


class ListingResponse(ListingBase):
    id: str
    owner: UserResponse
    starred: bool
    registered_bidder: bool
    highest_bid: Optional[int]
    reserve_met: bool
    reserve_price: Optional[int]
    landmarks: List[LandmarkReponse]
    image_ids: List[int]


@dataclass
class SearchListingsRequest:
    location: Optional[str] = Query(None,
                                    description="Matches (case-insensitive) on either suburb, postcode, street, state, or country")
    type: Optional[ListingType] = Query(None)
    num_bedrooms: Optional[int] = Query(None, ge=1)
    num_bathrooms: Optional[int] = Query(None, ge=1)
    num_car_spaces: Optional[int] = Query(None, ge=1)
    auction_start: Optional[datetime] = Query(None)
    auction_end: Optional[datetime] = Query(None)
    features: Optional[List[Feature]] = Query(None)
    landmarks: Optional[List[LandmarkType]] = Query(None)
    include_closed_auctions: bool = Query(False)
    is_user_query: bool = Query(True)
    limit: int = Query(10, ge=1)
    continuation: Optional[str] = Query(None)


class SearchListingsResponse(BaseModel):
    results: List[ListingResponse]
    continuation: Optional[str]


class AuctionResponse(BaseModel):
    bidders: List[int]
    bids: List[BidResponse]
