from pydantic import BaseModel, EmailStr


class UserBase(BaseModel):
    email: EmailStr


class SignupRequest(UserBase):
    password: str
    name: str


class LoginRequest(UserBase):
    password: str


class UserResponse(UserBase):
    name: str

    class Config:
        orm_mode = True
