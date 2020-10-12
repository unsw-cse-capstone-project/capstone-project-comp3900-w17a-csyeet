from dataclasses import asdict
from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import or_
from sqlalchemy.orm import Session
from fastapi_sqlalchemy import db
from ..schemas.search import ListingSearchResult, SearchRequest, SearchResponse
from ..models import Listing

router = APIRouter()

@router.post('/', response_model=SearchResponse)
def post(req: SearchRequest, session: Session = Depends(lambda: db.session)):
    result = session.query(Listing).filter(or_(
        Listing.suburb.ilike(req.location),
        Listing.street.ilike(req.location),
        Listing.postcode.ilike(req.location),
        Listing.state.ilike(req.location),
        Listing.country.ilike(req.location)
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