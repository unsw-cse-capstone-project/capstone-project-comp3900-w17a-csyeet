import hashlib
import uuid
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from fastapi_sqlalchemy import db
from ..schemas import UserResponse, SignupRequest
from ..models import User

router = APIRouter()

# example code


@router.get("/", response_model=UserResponse)
def get(session: Session = Depends(lambda: db.session)):
    return session.query(User).get(1)


# example request:
# curl -d '{"email":"bob@google.com", "password":"pword", "name":"Bob Jones"}' -X POST localhost:5000/auth -H "Content-Type: application/json"


def hash_password(password: str) -> str:
    salt = uuid.uuid4().hex
    return hashlib.sha256(salt.encode() + password.encode()).hexdigest() + ':' + salt


def check_password(hashed_password: str, user_password: str) -> bool:
    password, salt = hashed_password.split(':')
    return password == hashlib.sha256(salt.encode() + user_password.encode()).hexdigest()


@router.post('/signup', response_model=UserResponse)
def signup(req: SignupRequest, session: Session = Depends(lambda: db.session)):
    # TODO: add checks for whether user exists
    user_data = req.dict()
    user_data['hashed_password'] = hash_password(user_data.pop('password'))
    user = User(**user_data)
    UserResponse(**user.__dict__)
    session.add(user)
    session.commit()
    return user
