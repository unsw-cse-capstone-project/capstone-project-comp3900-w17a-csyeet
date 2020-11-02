from pydantic import BaseModel, EmailStr

class UserBase(BaseModel):
    email: EmailStr


class UserResponse(UserBase):
    id: int
    name: str

    class Config:
        orm_mode = True
