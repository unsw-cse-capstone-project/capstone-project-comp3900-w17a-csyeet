import io
from fastapi import APIRouter, Depends, HTTPException, File, UploadFile
from sqlalchemy.orm import Session
from starlette.responses import StreamingResponse
from ..schemas import OwnProfileResponse, UserProfileResponse
from ..helpers import get_signed_in_user, get_session, map_listing_response
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


def map_user_to_own_profile_response(user: User, session: Session) -> OwnProfileResponse:
    response = {}
    response['email'] = user.email
    response['name'] = user.name
    response['blurb'] = user.blurb
    response['listings'] = [map_listing_response(listing, user, session) for listing in user.listings]
    response['registrations'] = [map_listing_response(listing, user, session) for listing in user.registrations]
    response['starred_listings'] = [map_listing_response(listing, user, session) for listing in user.starred_listings]
    return response #type: ignore


def map_user_to_user_profile_response(user: User, session: Session) -> UserProfileResponse:
    response = {}
    response['email'] = user.email
    response['name'] = user.name
    response['blurb'] = user.blurb
    response['listings'] = [map_listing_response(listing, user, session) for listing in user.listings]
    return response #type: ignore
