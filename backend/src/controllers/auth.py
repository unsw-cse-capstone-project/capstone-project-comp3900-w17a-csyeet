from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import RedirectResponse, Response
from sqlalchemy.orm import Session
from ..schemas import LoginRequest, SignupRequest, UserResponse, GoogleLoginRequest, GoogleSignupRequest
from ..helpers import get_session, load_user, hash_password, password_matches, cookie_name, create_token, get_current_user, is_google_user, validate_google_id_token
from ..models import User

router = APIRouter()


@router.post('/signup', response_model=UserResponse, responses={409: {"description": "Conflict with existing entity"}})
def signup(req: SignupRequest, session: Session = Depends(get_session)):
    ''' Signs up a new user and logs them in '''
    if load_user(req.email, session) is not None:
        raise HTTPException(409, detail='Email already in use')

    user_data = req.dict()
    user_data['hashed_password'] = hash_password(user_data.pop('password'))
    user = User(**user_data)
    session.add(user)
    session.commit()
    return RedirectResponse(url='/login')


@router.post('/google_signup', response_model=UserResponse, responses={409: {"description": "Conflict with existing entity"}})
def google_signup(req: GoogleSignupRequest, session: Session = Depends(get_session)):
    ''' Signs up a new user and logs them in through Google SSO '''
    if load_user(req.email, session) is not None:
        raise HTTPException(409, detail='Email already in use')
    
    validate_google_id_token(req.google_id_token)
    
    user_data = req.dict()
    user_data.pop('google_id_token')
    user = User(**user_data)
    session.add(user)
    session.commit()
    return RedirectResponse(url='/google_login')


@router.post("/login", response_model=UserResponse, responses={401: {'description': 'Invalid credentials'}})
def login(req: LoginRequest, response: Response, session: Session = Depends(get_session)):
    ''' Logs in the user '''
    user = load_user(req.email, session)
    if user is None:
        raise HTTPException(401, detail='Invalid email')
    if is_google_user(user):
        raise HTTPException(401, detail='User did not sign up with email')
    if not password_matches(user.hashed_password, req.password):
        raise HTTPException(401, detail='Invalid password')

    token = create_token(req.email)
    response.set_cookie(cookie_name, token.decode(), httponly=False)
    return user


@router.post('/google_login', response_model=UserResponse, responses={401: {'description': 'Invalid credentials'}})
def google_login(req: GoogleLoginRequest, response: Response, session: Session = Depends(get_session)):
    ''' Logs in the user through Google SSO '''
    user = load_user(req.email, session)
    if user is None:
        raise HTTPException(401, detail='Invalid email')
    if not is_google_user(user):
        raise HTTPException(401, detail='User did not sign up with Google SSO')
    
    validate_google_id_token(req.google_id_token)
    token = create_token(req.email)
    response.set_cookie(cookie_name, token.decode(), httponly=False)
    return user


@router.post('/logout', dependencies=[Depends(get_current_user)])
def logout(response: Response):
    ''' Logs the current user out '''
    # invalidate the cookie by removing the token and expiring it immediately
    # this stops the cookie being sent by the browser and if it is, token validation will fail
    response.set_cookie(cookie_name, expires=0, httponly=True)
