from typing import List, Optional
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
    name: str
    blurb: Optional[str]
    listings: List[ListingResponse]


class OwnProfileResponse(ProfileBase):
    registrations: List[ListingResponse]
    starred_listings: List[ListingResponse]


class UserProfileResponse(ProfileBase):
    pass
