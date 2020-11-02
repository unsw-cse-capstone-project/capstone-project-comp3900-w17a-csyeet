from pydantic import BaseModel, EmailStr


class UserBase(BaseModel):
    email: EmailStr


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


class UserResponse(UserBase):
    id: int
    name: str

    class Config:
        orm_mode = True
