import hashlib
import uuid
from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session, sessionmaker, Query
from fastapi_sqlalchemy import db
from ..models import User

router = APIRouter()

# example code


@router.get("/")
def get(session: Session = Depends(lambda: db.session)):
    return session.query(User).get(1)


class UserBase(BaseModel):
    email: str  # change to EmailStr after installing email-validator
    name: str

    class Config:
        orm_mode = True


class SignupRequest(UserBase):
    password: str

# example request:
# curl -d '{"email":"bob@google.com", "password":"pword", "name":"Bob Jones"}' -X POST localhost:5000/auth -H "Content-Type: application/json"


def hash_password(password):
    salt = uuid.uuid4().hex
    return hashlib.sha256(salt.encode() + password.encode()).hexdigest() + ':' + salt


def check_password(hashed_password, user_password):
    password, salt = hashed_password.split(':')
    return password == hashlib.sha256(salt.encode() + user_password.encode()).hexdigest()


@router.post('/signup', response_model=UserBase)
def signup(req: SignupRequest, session: Session = Depends(lambda: db.session)):
    # TODO: add checks for whether user exists
    user_data = req.dict()
    user_data['hashed_password'] = hash_password(user_data.pop('password'))
    user = User(**user_data)
    session.add(user)
    session.commit()
    return user
