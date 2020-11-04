import io
from dataclasses import asdict
from fastapi import APIRouter, Depends, HTTPException, File, UploadFile
from sqlalchemy.orm import Session
from starlette.responses import StreamingResponse
from ..schemas import OwnProfileResponse, UserProfileResponse, UserResponse, UpdateUserRequest, UpdateUserResponse, ChangePasswordRequest
from ..helpers import get_signed_in_user, get_session, map_listing_response, password_matches, hash_password
from ..models import User

router = APIRouter()


@router.get('/profile', response_model=OwnProfileResponse)
def get_own_profile(signed_in_user: User = Depends(get_signed_in_user), session: Session = Depends(get_session)):
    ''' Get signed in user's profile '''
    return map_user_to_own_profile_response(signed_in_user, session)


@router.get('/{id}/profile', response_model=UserProfileResponse, responses={404: {"description": "Resource not found"}})
def get_user_profile(id: int, session: Session = Depends(get_session)):
    ''' Get a user's profile '''
    user = session.query(User).get(id)
    if user is None:
        raise HTTPException(
            status_code=404, detail="Requested user could not be found")
    return map_user_to_user_profile_response(user, session)


@router.post('/avatar')
def upload_avatar(file: UploadFile = File(...), signed_in_user: User = Depends(get_signed_in_user), session: Session = Depends(get_session)):
    ''' Create or update avatar for signed in user '''
    signed_in_user.avatar_data = file.file.read()
    signed_in_user.avatar_image_type = file.content_type
    session.commit()


@router.get('/avatar', responses={404: {"description": "Resource not found"}})
def get_own_avatar(signed_in_user: User = Depends(get_signed_in_user)):
    ''' Get signed in user's avatar '''
    if signed_in_user.avatar_data is None:
        raise HTTPException(
            status_code=404, detail="User has not uploaded an avatar")
    
    return StreamingResponse(io.BytesIO(signed_in_user.avatar_data), media_type=signed_in_user.avatar_image_type)


@router.get('/{id}/avatar', responses={404: {"description": "Resource not found"}})
def get_user_avatar(id: int, session: Session = Depends(get_session)):
    ''' Get a user's avatar '''
    user = session.query(User).get(id)
    if user is None:
       raise HTTPException(
            status_code=404, detail="Requested user could not be found") 
    
    if user.avatar_data is None:
        raise HTTPException(
            status_code=404, detail="User has not uploaded an avatar")
    
    return StreamingResponse(io.BytesIO(user.avatar_data), media_type=user.avatar_image_type)


@router.post('/profile/update', response_model=UpdateUserResponse)
def update_user_details(req: UpdateUserRequest, signed_in_user: User = Depends(get_signed_in_user), session: Session = Depends(get_session)):
    ''' Update user details for signed-in user '''
    data = req.dict()
    update_user(signed_in_user, data)
    session.commit()
    return asdict(signed_in_user)


@router.post('/profile/changepassword', responses={401: {'description': 'Invalid credentials'}})
def change_password(req: ChangePasswordRequest, signed_in_user: User = Depends(get_signed_in_user), session: Session = Depends(get_session)):
    ''' Change password for signed-in user'''
    if not password_matches(signed_in_user.hashed_password, req.old_password):
        raise HTTPException(401, detail='Old password does not match')

    signed_in_user.hashed_password = hash_password(req.new_password)
    session.commit()

    
@router.get('/{id}', response_model=UserResponse, responses={404: {"description": "Resource not found"}})
def get_user_info(id: int, session: Session = Depends(get_session)):
    ''' Get a user's basic info '''
    user = session.query(User).get(id)
    if user is None:
        raise HTTPException(
            status_code=404, detail="Requested user could not be found")
    return user


def map_user_to_own_profile_response(user: User, session: Session) -> OwnProfileResponse:
    response = asdict(user)
    response['listings'] = [map_listing_response(listing, user, session) for listing in user.listings]
    response['registrations'] = [map_listing_response(registration.listing, user, session) for registration in user.registrations]
    response['starred_listings'] = [map_listing_response(starred.listing, user, session) for starred in user.starred_listings]
    return response #type: ignore


def map_user_to_user_profile_response(user: User, session: Session) -> UserProfileResponse:
    response = asdict(user)
    response['listings'] = [map_listing_response(listing, user, session) for listing in user.listings]
    return response #type: ignore


def update_user(user: User, data: dict):
    for key, value in data.items():
        setattr(user, key, value)
