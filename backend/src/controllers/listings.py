from dataclasses import asdict
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import or_
from sqlalchemy.orm import Session
from fastapi_sqlalchemy import db
from ..schemas import CreateListingRequest, Feature, ListingResponse, field_to_feature_map, ListingSearchResponse, AuctionResponse
from ..models import Listing, User
from ..helpers import get_current_user
from typing import Optional

router = APIRouter()


@router.post('/', response_model=ListingResponse)
def create(req: CreateListingRequest, current_user: User = Depends(get_current_user), session: Session = Depends(lambda: db.session)):
    ''' Creates a listing owned by the user making the request '''
    # TODO: Should we prevent creation for some set of values which we deem to be unique? e.g. address?
    # TODO: maybe extract this helper code
    listing_data = req.dict()
    listing_data.update({get_field_for_feature(feature): True
                         for feature in req.features})
    listing_data.pop('features')
    listing = Listing(owner_id=current_user.id, **listing_data)
    session.add(listing)
    session.commit()
    return map_listing_to_response(listing)


@router.get('/', response_model=ListingSearchResponse)
def search(location: Optional[str] = '', session: Session = Depends(lambda: db.session)):
    ''' Gets a list of listings filtered by the given criteria '''
    results = session.query(Listing).filter(or_(
        Listing.suburb.ilike(location),
        Listing.street.ilike(location),
        Listing.postcode.ilike(location),
        Listing.state.ilike(location),
        Listing.country.ilike(location)
    )).all()

    responses = [map_listing_to_response(r) for r in results]
    return {'results': responses}


@router.get('/{id}', response_model=ListingResponse, responses={404: {"description": "Resource not found"}})
def get(id: int, session: Session = Depends(lambda: db.session)):
    ''' Gets a listing by its id '''
    listing = session.query(Listing).get(id)
    if listing is None:
        raise HTTPException(
            status_code=404, detail="Requested listing could not be found")
    return map_listing_to_response(listing)


@router.get('/{id}/auction', response_model=AuctionResponse, responses={404: {"description": "Resource not found"}})
def get_auction_info(id: int, session: Session = Depends(lambda: db.session)):
    ''' Gets auction info for a listing '''
    listing = session.query(Listing).get(id)
    if listing is None:
        raise HTTPException(
            status_code=404, detail="Requested listing could not be found")
    bidders = [bidder.user_id for bidder in listing.bidders]
    return {'bidders': bidders}

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
