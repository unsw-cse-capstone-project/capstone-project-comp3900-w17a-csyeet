from dataclasses import asdict
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import or_
from sqlalchemy.orm import Session
from fastapi_sqlalchemy import db
from ..schemas import CreateListingRequest, Feature, ListingResponse, field_to_feature_map, ListingSearchResponse, AuctionResponse
from ..models import Listing
from typing import Optional

router = APIRouter()


@router.post('/', response_model=ListingResponse)
def create(req: CreateListingRequest, session: Session = Depends(lambda: db.session)):
    ''' Creates a listing owned by the user making the request '''
    # TODO: Should we prevent creation for some set of values which we deem to be unique? e.g. address?
    listing_data = req.dict()
    listing_data.update({get_field_for_feature(feature): True
                         for feature in req.features})
    listing_data.pop('features')
    # TODO: restrict this endpoint to authenticated users and use the current user
    listing = Listing(owner_id=1, **listing_data)
    session.add(listing)
    session.commit()
    return map_listing_to_response(listing)


@router.get('/{id}', response_model=ListingResponse, responses={404: {"description": "Resource not found"}})
def get(id: int, session: Session = Depends(lambda: db.session)):
    ''' Gets a listing by its id '''
    listing = session.query(Listing).get(id)
    if listing is None:
        raise HTTPException(
            status_code=404, detail="Requested listing could not be found")
    return map_listing_to_response(listing)

@router.get('/{id}/auction', response_model=AuctionResponse, responses={404: {"description": "Resource not found"}})
def get_auction_info(id: int, session: Session = Depends(lambda : db.session)):
    ''' Gets auction info for a listing by its id '''
    listing = session.query(Listing).get(id)
    if listing is None:
        raise HTTPException(
            status_code=404, detail="Requested listing could not be found")
    bidders = [asdict(bidder) for bidder in listing.bidders]
    return { 'bidders': bidders }

# TODO: move these to helpers.py or common/helpers.py or sth

def map_listing_to_response(listing: Listing) -> ListingResponse:
    response = asdict(listing)
    response['owner'] = listing.owner
    response['features'] = []
    for field, feature in field_to_feature_map.items():
        if response[field]:
            response['features'].append(feature)
        response.pop(field)
    return response  # type: ignore


def get_field_for_feature(feature: Feature) -> str:
    keys = list(field_to_feature_map.keys())
    values = list(field_to_feature_map.values())
    return keys[values.index(feature)]
