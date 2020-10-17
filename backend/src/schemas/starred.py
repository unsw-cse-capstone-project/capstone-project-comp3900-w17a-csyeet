from pydantic import BaseModel


class StarredResponse(BaseModel):
    listing_id: int
    user_id: int

    class Config:
        orm_mode = True
