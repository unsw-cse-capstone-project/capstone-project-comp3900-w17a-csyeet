from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, EmailStr


class UserBase(BaseModel):
    email: EmailStr


class SignupRequest(UserBase):
    password: str
    name: str


class LoginRequest(UserBase):
    password: str


class UserResponse(UserBase):
    id: int
    name: str

    class Config:
        orm_mode = True


class ProfileListingResponse(BaseModel):
    id: int
    street: str
    suburb: str
    postcode: str
    state: str
    num_bedrooms: int
    num_bathrooms: int
    num_car_spaces: int
    auction_start: datetime
    auction_end: datetime
    image_ids: List[int]
    starred: bool
    highest_bid: Optional[int]
    reserve_met: bool


class ProfileResponse(UserBase):
    name: str
    blurb: Optional[str]
    listings: List[ProfileListingResponse]
    registrations: List[ProfileListingResponse]
    starred_listings: List[ProfileListingResponse]
