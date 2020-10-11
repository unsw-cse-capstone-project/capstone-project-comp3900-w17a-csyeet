from pydantic import BaseModel


class UserBase(BaseModel):
    email: str  # change to EmailStr after installing email-validator
    name: str

    class Config:
        orm_mode = True


class SignupRequest(UserBase):
    password: str


class UserResponse(UserBase):
    pass
