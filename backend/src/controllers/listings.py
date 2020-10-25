from datetime import datetime, timedelta
from dataclasses import asdict
from typing import Optional, List
import io
from fastapi import APIRouter, Depends, HTTPException, File, UploadFile
from sqlalchemy import or_
from sqlalchemy.orm import Session, Query
from starlette.responses import StreamingResponse
from ..schemas import CreateListingRequest, Feature, ListingResponse, field_to_feature_map, SearchListingsRequest, SearchListingsResponse, AuctionResponse, BidRequest, PlaceBidResponse
from ..models import Listing, User, Starred, Bid, Registration, Image
from ..helpers import get_session, get_current_user, get_signed_in_user, find_nearby_landmarks, get_highest_bid, map_bid_to_response

router = APIRouter()


@router.post('/', response_model=ListingResponse)
def create(req: CreateListingRequest, signed_in_user: User = Depends(get_signed_in_user), session: Session = Depends(get_session)):
    ''' Creates a listing owned by the user making the request '''
    # TODO: Should we prevent creation for some set of values which we deem to be unique? e.g. address?
    # TODO: maybe extract this helper code
    listing_data = req.dict()
    listing_data.update({get_field_for_feature(feature): True
                         for feature in req.features})
    listing_data.pop('features')
    listing = Listing(owner_id=signed_in_user.id, **listing_data)
    session.add(listing)
    session.flush()  # sends the listing to the db transaction so the autogenerated id can be used

    # find nearby landmarks
    landmarks = find_nearby_landmarks(listing)
    session.add_all(landmarks)

    session.commit()
    return map_listing_to_response(listing, None, False, False)


@router.get('/', response_model=SearchListingsResponse)
# using a class dependency instead of method params because there's too many query params
def search(req: SearchListingsRequest = Depends(), current_user: Optional[User] = Depends(get_current_user), session: Session = Depends(get_session)):
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

    responses = [map_listing_response(listing, current_user, session) for listing in results]       
    return {'results': responses}


@router.get('/{id}', response_model=ListingResponse, responses={404: {"description": "Resource not found"}})
def get(id: int, current_user: Optional[User] = Depends(get_current_user), session: Session = Depends(get_session)):
    ''' Gets a listing by its id '''
    listing = session.query(Listing).get(id)
    if listing is None:
        raise HTTPException(
            status_code=404, detail="Requested listing could not be found")
    return map_listing_response(listing, current_user, session)


@router.get('/{id}/auction', response_model=AuctionResponse, responses={404: {"description": "Resource not found"}})
def get_auction_info(id: int, session: Session = Depends(get_session)):
    ''' Gets auction info for a listing '''
    listing = session.query(Listing).get(id)
    if listing is None:
        raise HTTPException(
            status_code=404, detail="Requested listing could not be found")

    bidders = [bidder.user_id for bidder in listing.bidders]
    bids = [map_bid_to_response(bid, listing)
            for bid in listing.bids]
    return {'bidders': bidders, 'bids': bids}


@router.post('/{id}/auction/bid', response_model=PlaceBidResponse, responses={404: {"description": "Resource not found"}, 403: {"description": "Operation forbidden"}})
def place_bid(id: int, req: BidRequest, signed_in_user: User = Depends(get_signed_in_user), session: Session = Depends(get_session)):
    ''' Places a bid '''
    listing = session.query(Listing).get(id)
    if listing is None:
        raise HTTPException(
            status_code=404, detail="Requested listing could not be found")

    registration = session.query(Registration).get((id, signed_in_user.id))
    if registration is None:
        raise HTTPException(
            status_code=401, detail="User is not registered to bid on this property")

    highest_bid = get_highest_bid(listing.id, session) # user is registered so there's >= 1 bid
    if req.bid <= highest_bid:
        raise HTTPException(
            status_code=403, detail=f"Bid must be higher than the current highest bid of {highest_bid}")

    bid = Bid(listing_id=id, bidder_id=signed_in_user.id,
              bid=req.bid, placed_at=datetime.now())
    session.add(bid)
    if get_auction_time_remaining(listing) <= timedelta(minutes=5):
        listing.auction_end += timedelta(minutes=2)
    session.commit()
    return map_bid_to_response(bid, listing)


@router.post('/{id}/star', responses={404: {"description": "Resource not found"}, 403: {"description": "Operation forbidden"}})
def star(id: int, signed_in_user: User = Depends(get_signed_in_user), session: Session = Depends(get_session)):
    ''' Star a listing '''
    listing = session.query(Listing).get(id)
    if listing is None:
        raise HTTPException(
            status_code=404, detail="Requested listing could not be found")

    starred = session.query(Starred).get((id, signed_in_user.id))
    if starred is not None:
        raise HTTPException(
            status_code=403, detail="User has already starred this listing")

    starred = Starred(listing_id=id, user_id=signed_in_user.id)
    session.add(starred)
    session.commit()


@router.post('/{id}/unstar', responses={404: {"description": "Resource not found"}, 403: {"description": "Operation forbidden"}})
def unstar(id: int, signed_in_user: User = Depends(get_signed_in_user), session: Session = Depends(get_session)):
    ''' Unstar a listing '''
    listing = session.query(Listing).get(id)
    if listing is None:
        raise HTTPException(
            status_code=404, detail="Requested listing could not be found")

    starred = session.query(Starred).get((id, signed_in_user.id))
    if starred is None:
        raise HTTPException(
            status_code=403, detail="User has not starred this listing")

    session.delete(starred)
    session.commit()


@router.post('/{id}/images', responses={404: {"description": "Resource not found"}, 403: {"description": "Operation forbidden"}})
def upload_images(id: int, files: List[UploadFile] = File(...), signed_in_user: User = Depends(get_signed_in_user), session: Session = Depends(get_session)):
    ''' Upload images '''
    listing = session.query(Listing).get(id)
    if listing is None:
        raise HTTPException(
            status_code=404, detail="Requested listing could not be found")
    
    if listing.owner_id != signed_in_user.id:
        raise HTTPException(
            status_code=403, detail="User cannot upload image for this listing")
        
    images = [Image(listing_id=id, data=image.file.read(), image_type=image.content_type) for image in files]
    session.add_all(images)
    session.commit()
    

@router.get('/{listing_id}/images/{image_id}', responses={404: {"description": "Resource not found"}})
def get_image(listing_id: int, image_id: int, session: Session = Depends(get_session)):
    ''' Get an image '''
    listing = session.query(Listing).get(listing_id)
    if listing is None:
        raise HTTPException(
            status_code=404, detail="Requested listing could not be found")

    image = session.query(Image).get(image_id)
    if image is None:
        raise HTTPException(
            status_code=404, detail="Requested image could not be found")

    return StreamingResponse(io.BytesIO(image.data), media_type=image.image_type)


@router.delete('/{id}', responses={404: {"description": "Resource not found"}, 403: {"description": "Operation forbidden"}})
def delete(id: int, signed_in_user: User = Depends(get_signed_in_user), session: Session = Depends(get_session)):
    ''' Delete a listing '''
    listing = session.query(Listing).get(id)
    if listing is None:
        raise HTTPException(
            status_code=404, detail="Requested listing could not be found")

    if listing.owner_id != signed_in_user.id:
        raise HTTPException(
            status_code=403, detail="User cannot delete this listing")

    session.delete(listing)
    session.commit()

# TODO: move these to helpers.py or common/helpers.py or sth


def map_listing_to_response(listing: Listing, highest_bid: Optional[int], starred: bool, registered_bidder: bool) -> ListingResponse:
    response = asdict(listing)
    response['owner'] = listing.owner
    response['highest_bid'] = highest_bid
    response['reserve_met'] = highest_bid is not None and highest_bid >= listing.reserve_price
    response['landmarks'] = listing.landmarks
    response['image_ids'] = [image.id for image in listing.images]
    response['features'] = []
    for field, feature in field_to_feature_map.items():
        if response[field]:
            response['features'].append(feature)
        response.pop(field)
    response['starred'] = starred
    response['registered_bidder'] = registered_bidder
    return response  # type: ignore


def map_listing_response(listing, current_user: Optional[User], session: Session) -> ListingResponse:
    highest_bid = get_highest_bid(listing.id, session)
    starred = is_listing_starred(listing, current_user, session)
    registered_bidder = is_user_registered_bidder(listing, current_user, session)
    return map_listing_to_response(listing, highest_bid, starred, registered_bidder)


def get_field_for_feature(feature: Feature) -> str:
    keys = list(field_to_feature_map.keys())
    values = list(field_to_feature_map.values())
    return keys[values.index(feature)]


def get_auction_time_remaining(listing: Listing) -> timedelta:
    return listing.auction_end - datetime.now()


def is_listing_starred(listing: Listing, user: Optional[User], session: Session) -> bool:
    if user is None:
        return False
    return session.query(Starred).get((listing.id, user.id)) is not None


def is_user_registered_bidder(listing: Listing, user: Optional[User], session: Session) -> bool:
    if user is None:
        return False
    return session.query(Registration).get((listing.id, user.id)) is not None
