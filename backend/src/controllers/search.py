from dataclasses import asdict
from typing import List
from fastapi import APIRouter, Depends, Query
from sqlalchemy import or_
from sqlalchemy.orm import Session
from fastapi_sqlalchemy import db
from ..schemas import ListingSearchResult, SearchResponse
from ..models import Listing

router = APIRouter()

@router.get('/', response_model=SearchResponse)
def get(q: str = Query('', alias='query'), session: Session = Depends(lambda: db.session)):
    result = session.query(Listing).filter(or_(
        Listing.suburb.ilike(q),
        Listing.street.ilike(q),
        Listing.postcode.ilike(q),
        Listing.state.ilike(q),
        Listing.country.ilike(q)
        ))
    listings = [l for l in result]
    return map_to_search_response(listings)

def map_to_search_response(listings: List[Listing]) -> SearchResponse:
    response = {}
    response['result'] = []
    for listing in listings:
        response['result'].append(map_listing_to_listing_search_result(listing))
    return response

def map_listing_to_listing_search_result(listing: Listing) -> ListingSearchResult:
    response = asdict(listing)
    return response