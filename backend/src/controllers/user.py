import io
from dataclasses import asdict
from fastapi import APIRouter, Depends, HTTPException, File, UploadFile
from sqlalchemy.orm import Session
from starlette.responses import StreamingResponse
from ..schemas import ProfileResponse, ProfileListingResponse
from ..helpers import get_signed_in_user, get_session, is_listing_starred, get_highest_bid
from ..models import User, Listing, Profile_Image

router = APIRouter()


@router.get('/profile', response_model=ProfileResponse)
def get_own_profile(signed_in_user: User = Depends(get_signed_in_user), session: Session = Depends(get_session)):
    ''' Get signed in user's profile '''
    return map_user_to_response(signed_in_user, session)


@router.get('/{id}/profile', response_model=ProfileResponse, responses={404: {"description": "Resource not found"}})
def get_user_profile(id: int, session: Session = Depends(get_session)):
    ''' Get a user's profile '''
    user = session.query(User).get(id)
    if user is None:
        raise HTTPException(
            status_code=404, detail="Requested user could not be found")
    return map_user_to_response(user, session)


@router.post('/profile/image')
def upload_profile_image(file: UploadFile = File(...), signed_in_user: User = Depends(get_signed_in_user), session: Session = Depends(get_session)):
    ''' Upload profile image for signed in user '''
    if signed_in_user.profile_image is not None:
        signed_in_user.profile_image.data = file.file.read()
        signed_in_user.profile_image.image_type = file.content_type
    else:
        image = Profile_Image(user_id=signed_in_user.id, data=file.file.read(), image_type=file.content_type)
        session.add(image)
    session.commit()


@router.get('/profile/image', responses={404: {"description": "Resource not found"}})
def get_own_profile_image(signed_in_user: User = Depends(get_signed_in_user)):
    ''' Get signed in user's profile image '''
    if signed_in_user.profile_image is None:
        raise HTTPException(
            status_code=404, detail="User has not uploaded profile image")
    
    return StreamingResponse(io.BytesIO(signed_in_user.profile_image.data), media_type=signed_in_user.profile_image.image_type)


@router.get('/{id}/profile/image', responses={404: {"description": "Resource not found"}})
def get_user_profile_image(id: int, session: Session = Depends(get_session)):
    ''' Get a user's profile image '''
    user = session.query(User).get(id)
    if user is None:
       raise HTTPException(
            status_code=404, detail="Requested user could not be found") 
    
    if user.profile_image is None:
        raise HTTPException(
            status_code=404, detail="User has not uploaded profile image")
    
    return StreamingResponse(io.BytesIO(user.profile_image.data), media_type=user.profile_image.image_type)


def map_user_to_response(user: User, session: Session) -> ProfileResponse:
    response = {}
    response['email'] = user.email
    response['name'] = user.name
    response['blurb'] = user.blurb
    response['listings'] = [map_listing_to_profile_response(listing, user, session) for listing in user.listings]
    response['registrations'] = [map_listing_to_profile_response(listing, user, session) for listing in user.registrations]
    response['starred_listings'] = [map_listing_to_profile_response(listing, user, session) for listing in user.starred_listings]
    return response #type: ignore


def map_listing_to_profile_response(listing: Listing, user: User, session: Session) -> ProfileListingResponse:
    highest_bid = get_highest_bid(listing.id, session)
    response = asdict(listing)
    response['image_ids'] = [image.id for image in listing.images]
    response['starred'] = is_listing_starred(listing, user, session)
    response['highest_bid'] = highest_bid
    response['reserve_met'] = highest_bid is not None and highest_bid >= listing.reserve_price
    return response #type: ignore
