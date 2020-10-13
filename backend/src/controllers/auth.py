import hashlib
import uuid
import jwt
from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import RedirectResponse, Response
from fastapi.security import APIKeyCookie
from sqlalchemy.orm import Session
from fastapi_sqlalchemy import db
from typing import Optional
from starlette.status import HTTP_403_FORBIDDEN
from ..schemas import LoginRequest, SignupRequest
from ..models import User

router = APIRouter()


@router.post('/signup', responses={409: {"description": "Conflict with existing entity"}})
def signup(req: SignupRequest, session: Session = Depends(lambda: db.session)):
    if load_user(req.email, session) is not None:
        raise HTTPException(409, detail='Email already in use')

    user_data = req.dict()
    user_data['hashed_password'] = hash_password(user_data.pop('password'))
    user = User(**user_data)
    session.add(user)
    session.commit()
    return RedirectResponse(url='/login')


cookie_name = "session"
cookie_security = APIKeyCookie(name=cookie_name)
secret_key = '825d86db7d67844c086c01ed8001f8df82dc99c16a8cad4e'  # TODO: extract


@router.post("/login", responses={401: {'description': 'Invalid credentials'}})
def login(req: LoginRequest, response: Response, session: Session = Depends(lambda: db.session)):
    user = load_user(req.email, session)
    if user is None:
        raise HTTPException(401, detail='Invalid email')
    if not password_matches(user.hashed_password, req.password):
        raise HTTPException(401, detail='Invalid password')

    token = jwt.encode({"sub": req.email}, secret_key)
    response.set_cookie(cookie_name, token.decode())


def get_current_user(token: str = Depends(cookie_security), session: Session = Depends(lambda: db.session)):
    try:
        payload = jwt.decode(token, secret_key)
        email = payload["sub"]
        user = load_user(email, session)
        if user is None:
            raise Exception
        return user
    except Exception:
        raise HTTPException(status_code=HTTP_403_FORBIDDEN,
                            detail="Invalid authentication")


@router.post('/logout', dependencies=[Depends(get_current_user)])
def logout(response: Response):
    # invalidate the cookie by removing the token and expiring it immediately
    # this stops the cookie being sent by the browser and if it is, token validation will fail
    response.set_cookie(cookie_name, expires=0, httponly=True)


def hash_password(password: str) -> str:
    salt = uuid.uuid4().hex
    return hashlib.sha256(salt.encode() + password.encode()).hexdigest() + ':' + salt


def password_matches(hashed_password: str, user_password: str) -> bool:
    password, salt = hashed_password.split(':')
    return password == hashlib.sha256(salt.encode() + user_password.encode()).hexdigest()


def load_user(email: str, session: Session) -> Optional[User]:
    return session.query(User).filter_by(email=email).one_or_none()
