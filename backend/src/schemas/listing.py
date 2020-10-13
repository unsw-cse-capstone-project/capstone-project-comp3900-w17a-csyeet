from datetime import datetime
from pydantic import BaseModel, Field
from fastapi_utils.enums import CamelStrEnum
from enum import auto
from typing import List
from .user import UserResponse
from .registration import RegistrationResponse


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
    num_bedrooms: int = Field(..., ge=0)
    num_bathrooms: int = Field(..., ge=0)
    num_car_spaces: int = Field(..., ge=0)
    auction_start: datetime
    auction_end: datetime
    features: List[Feature]


class CreateListingRequest(ListingBase):
    pass


class ListingResponse(ListingBase):
    id: str
    owner: UserResponse

class ListingSearchResponse(BaseModel):
    results: List[ListingResponse]

class AuctionResponse(BaseModel):
    bidders: List[RegistrationResponse]
