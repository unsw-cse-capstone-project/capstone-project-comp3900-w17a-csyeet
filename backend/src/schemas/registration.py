from pydantic import BaseModel, Field
from datetime import datetime

class CreateRegistrationRequest(BaseModel):
    bid: int
    card_number: str
    expiry: datetime
    ccv: str

class RegistrationResponse(BaseModel):
    listing_id: int
    user_id: int
    bid: int

    class Config:
        orm_mode = True