from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..schemas import InteractionsRecommendations
from ..helpers import get_signed_in_user, get_session, recommend_from_interactions, map_listing_response
from ..models import User

router = APIRouter()


@router.get('/interactions', response_model=InteractionsRecommendations)
def recommend_from_user_interactions(signed_in_user: User = Depends(get_signed_in_user), session: Session = Depends(get_session)):
    ''' Gets property recommendations for the signed in user based on their past searches, starred properties and auctions registered for.
        An empty response indicates more interactions are required.
    '''
    listings = recommend_from_interactions(signed_in_user, session)
    return {'recommendations': [map_listing_response(listing, signed_in_user, session) for listing in listings]}
