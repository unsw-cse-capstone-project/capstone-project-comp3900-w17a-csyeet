from dataclasses import asdict
from fastapi import APIRouter, Depends, Query
from sqlalchemy import or_
from sqlalchemy.orm import Session
from fastapi_sqlalchemy import db
from ..schemas import ListingSearchResponse, ListingResponse, field_to_feature_map
from ..models import Listing
from typing import Optional

router = APIRouter()

@router.get('/', response_model=ListingSearchResponse)
def get(q: Optional[str] = Query('', alias='location'), session: Session = Depends(lambda: db.session)):
    ''' Gets list of results by location '''
    results = session.query(Listing).filter(or_(
        Listing.suburb.ilike(q),
        Listing.street.ilike(q),
        Listing.postcode.ilike(q),
        Listing.state.ilike(q),
        Listing.country.ilike(q)
    )).all()

    responses = [map_listing_to_response(r) for r in results]
    return { 'results': responses }

def map_listing_to_response(listing: Listing) -> ListingResponse:
    response = asdict(listing)
    response['owner'] = listing.owner
    response['features'] = []
    for field, feature in field_to_feature_map.items():
        if response[field]:
            response['features'].append(feature)
        response.pop(field)
    return response  # type: ignore