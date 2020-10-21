from dataclasses import asdict
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import or_, and_
from sqlalchemy.orm import Session, Query
from ..schemas import CreateListingRequest, Feature, ListingResponse, field_to_feature_map, SearchListingsRequest, SearchListingsResponse, AuctionResponse, BidResponse, BidRequest
from ..models import Listing, User, Starred, Bid, Registration
from ..helpers import get_session, get_current_user
from datetime import datetime, timedelta

router = APIRouter()


@router.post('/', response_model=ListingResponse)
def create(req: CreateListingRequest, current_user: User = Depends(get_current_user), session: Session = Depends(get_session)):
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


@router.get('/', response_model=SearchListingsResponse)
# using a class dependency instead of method params because there's too many query params
def search(req: SearchListingsRequest = Depends(), session: Session = Depends(get_session)):
    ''' Finds listings which match all of the specified criteria '''
    query: Query = session.query(Listing)
    # TODO: maybe extract this helper code
    conditions = []
    if req.location:
        conditions.append(or_(
            Listing.suburb.ilike(req.location),
            Listing.street.ilike(req.location),
            Listing.postcode.ilike(req.location),
            Listing.state.ilike(req.location),
            Listing.country.ilike(req.location)
        ))
    if req.type:
        conditions.append(Listing.type == req.type)
    if req.num_bedrooms:
        conditions.append(Listing.num_bedrooms == req.num_bedrooms)
    if req.num_bathrooms:
        conditions.append(Listing.num_bathrooms == req.num_bathrooms)
    if req.num_car_spaces:
        conditions.append(Listing.num_car_spaces == req.num_car_spaces)
    if req.auction_start:
        conditions.append(Listing.auction_start >= req.auction_start)
    if req.auction_end:
        conditions.append(Listing.auction_end <= req.auction_end)
    if req.features:
        conditions.extend(
            getattr(Listing, get_field_for_feature(feature)) == True for feature in req.features)

    # TODO: consider default sort field
    results = query.filter(*conditions).all()

    responses = [map_listing_to_response(r) for r in results]
    return {'results': responses}


@router.get('/{id}', response_model=ListingResponse, responses={404: {"description": "Resource not found"}})
def get(id: int, session: Session = Depends(get_session)):
    ''' Gets a listing by its id '''
    listing = session.query(Listing).get(id)
    if listing is None:
        raise HTTPException(
            status_code=404, detail="Requested listing could not be found")
    return map_listing_to_response(listing)


@router.get('/{id}/auction', response_model=AuctionResponse, responses={404: {"description": "Resource not found"}})
def get_auction_info(id: int, session: Session = Depends(get_session)):
    ''' Gets auction info for a listing '''
    listing = session.query(Listing).get(id)
    if listing is None:
        raise HTTPException(
            status_code=404, detail="Requested listing could not be found")

    bidders = [bidder.user_id for bidder in listing.bidders]
    bids = [map_bid_to_response(bid) for bid in listing.bids]
    highest_bid = max(bids, key=lambda x: x['bid']) if bids else None
    return {'bidders': bidders, 'bids': bids, 'current_highest_bid': highest_bid}


@router.post('/{id}/auction/bid', response_model=BidResponse, responses={404: {"description": "Resource not found"}, 403: {"description": "Operation forbidden"}, 401: {'description': "User unauthorized"}})
def place_bid(id: int, req: BidRequest, current_user: User = Depends(get_current_user), session: Session = Depends(get_session)):
    ''' Places a bid '''
    listing = session.query(Listing).get(id)
    if listing is None:
        raise HTTPException(
            status_code=404, detail="Requested listing could not be found")

    registration = session.query(Registration).get((id, current_user.id))
    if registration is None:
        raise HTTPException(
            status_code=401, detail="User is not registered to bid on this property")

    bid = session.query(Bid).get((id, current_user.id, req.bid))
    if bid is not None:
        raise HTTPException(
            status_code=403, detail="User has already bid this amount on this property")

    bid = Bid(listing_id=id, user_id=current_user.id,
              bid=req.bid, placed_at=datetime.now())
    session.add(bid)
    if get_auction_time_remaining(listing) <= timedelta(minutes=5):
        listing.auction_end += timedelta(minutes=2)
    session.commit()
    return map_bid_to_response(bid)


@router.post('/{id}/star', responses={404: {"description": "Resource not found"}, 403: {"description": "Operation forbidden"}})
def star(id: int, current_user: User = Depends(get_current_user), session: Session = Depends(get_session)):
    ''' Star a listing '''
    listing = session.query(Listing).get(id)
    if listing is None:
        raise HTTPException(
            status_code=404, detail="Requested listing could not be found")

    starred = session.query(Starred).get((id, current_user.id))
    if starred is not None:
        raise HTTPException(
            status_code=403, detail="User has already starred this listing")

    starred = Starred(listing_id=id, user_id=current_user.id)
    session.add(starred)
    session.commit()


@router.post('/{id}/unstar', responses={404: {"description": "Resource not found"}, 403: {"description": "Operation forbidden"}})
def unstar(id: int, current_user: User = Depends(get_current_user), session: Session = Depends(get_session)):
    ''' Unstar a listing '''
    listing = session.query(Listing).get(id)
    if listing is None:
        raise HTTPException(
            status_code=404, detail="Requested listing could not be found")

    starred = session.query(Starred).get((id, current_user.id))
    if starred is None:
        raise HTTPException(
            status_code=403, detail="User has not starred this listing")

    session.delete(starred)
    session.commit()


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


def map_bid_to_response(bid: Bid) -> BidResponse:
    response = asdict(bid)
    response.pop('listing_id')
    response['auction_end'] = bid.listing.auction_end
    return response


def get_auction_time_remaining(listing: Listing) -> timedelta:
    return listing.auction_end - datetime.now()
