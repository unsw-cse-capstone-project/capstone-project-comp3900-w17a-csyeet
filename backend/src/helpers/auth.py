import jwt
import hashlib
import uuid
from fastapi import Depends, HTTPException
from fastapi.security import APIKeyCookie
from starlette.status import HTTP_403_FORBIDDEN
from sqlalchemy.orm import Session
from pydantic import EmailStr
from typing import Optional
from ..models import User
from .common import get_session

cookie_name = "session"
cookie_security = APIKeyCookie(name=cookie_name, auto_error=False)
secret_key = '825d86db7d67844c086c01ed8001f8df82dc99c16a8cad4e'  # TODO: extract


def load_user(email: str, session: Session) -> Optional[User]:
    return session.query(User).filter_by(email=email).one_or_none()


def create_token(email: EmailStr) -> bytes:
    return jwt.encode({"sub": email}, secret_key)


def get_current_user(token: str = Depends(cookie_security), session: Session = Depends(get_session)) -> Optional[User]:
    if token is None:
        return None
    payload = jwt.decode(token, secret_key)
    email = payload["sub"]
    return load_user(email, session)


def get_signed_in_user(current_user: Optional[User] = Depends(get_current_user)) -> User:
    try:
        if current_user is None:
            raise Exception
        return current_user
    except Exception:
        raise HTTPException(status_code=HTTP_403_FORBIDDEN,
                            detail="Invalid authentication")


def hash_password(password: str) -> str:
    salt = uuid.uuid4().hex
    return hashlib.sha256(salt.encode() + password.encode()).hexdigest() + ':' + salt


def password_matches(hashed_password: str, user_password: str) -> bool:
    password, salt = hashed_password.split(':')
    return password == hashlib.sha256(salt.encode() + user_password.encode()).hexdigest()
