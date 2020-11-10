from typing import List, Optional
from pydantic import BaseModel
from .common import UserBase
from .listing import ListingResponse


class SignupRequest(UserBase):
    password: str
    name: str
    phone_number: str
    street: str
    suburb: str
    postcode: str
    state: str
    country: str


class LoginRequest(UserBase):
    password: str


class ProfileBase(UserBase):
    id: int
    name: str
    blurb: Optional[str]
    listings: List[ListingResponse]


class OwnProfileResponse(ProfileBase):
    phone_number: str
    street: str
    suburb: str
    postcode: str
    state: str 
    country: str
    registrations: List[ListingResponse]
    starred_listings: List[ListingResponse]


class UserProfileResponse(ProfileBase):
    pass


class UpdateUserBase(BaseModel):
    name: str
    blurb: str
    phone_number: str
    street: str
    suburb: str
    postcode: str
    state: str 
    country: str


class UpdateUserRequest(UpdateUserBase):
    old_password: Optional[str]
    new_password: Optional[str]


class UpdateUserResponse(UpdateUserBase):
    pass
