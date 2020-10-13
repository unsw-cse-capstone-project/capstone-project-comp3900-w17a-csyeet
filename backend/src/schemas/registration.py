from pydantic import BaseModel, Field
from datetime import datetime

class RegistrationBase(BaseModel):
    listing_id: int
    user_id: int
    bid: int
    card_number: str
    expiry: datetime
    ccv: str

class CreateRegistrationRequest(RegistrationBase):
    pass

class RegistrationResponse(RegistrationBase):
    id : str