from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..schemas import InteractionsRecommendations
from ..helpers import get_signed_in_user, get_session
from ..models import User, Listing
from .listings import map_listing_response

router = APIRouter()


@router.get('/interactions', response_model=InteractionsRecommendations)
def recommend_from_interactions(signed_in_user: User = Depends(get_signed_in_user), session: Session = Depends(get_session)):
    ''' Gets property recommendations for the signed in user based on their past searches, starred properties and auctions registered for.
        An empty response indicates more interactions are required.
    '''
    listings = session.query(Listing).limit(3).all()
    return {'recommendations': [map_listing_response(listing, signed_in_user, session) for listing in listings]}
