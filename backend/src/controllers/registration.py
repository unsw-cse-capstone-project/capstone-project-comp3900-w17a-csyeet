from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi_sqlalchemy import db
from ..schemas import CreateRegistrationRequest, RegistrationResponse
from ..helpers import get_current_user
from ..models import Registration, Listing, User, Bid

router = APIRouter()


@router.post('/{listing_id}', response_model=RegistrationResponse,
             responses={404: {"description": "Resource not found"}, 403: {"description": "Operation forbidden"}})
def register(listing_id: int, req: CreateRegistrationRequest, current_user: User = Depends(get_current_user), session: Session = Depends(lambda: db.session)):
    ''' Registers a user as a RAB for a listing '''
    listing = session.query(Listing).get(listing_id)
    if listing is None:
        raise HTTPException(
            status_code=404, detail="Requested listing could not be found")
    if session.query(Registration).get((listing_id, current_user.id)):
        raise HTTPException(
            status_code=403, detail="User already registered for listing")

    registration = Registration(
        listing_id=listing_id, user_id=current_user.id, **req.dict())
    session.add(registration)

    bid = Bid(listing_id=listing_id, bidder_id=current_user.id,
              bid=req.bid, placed_at=datetime.now())
    session.add(bid)

    session.commit()
    return registration
