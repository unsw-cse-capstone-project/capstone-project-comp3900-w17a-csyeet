import io
from datetime import datetime, timedelta
from dataclasses import asdict
from typing import Optional, List
from fastapi import APIRouter, Depends, HTTPException, File, UploadFile
from sqlalchemy import or_
from sqlalchemy.orm import Session, Query
from starlette.responses import StreamingResponse
from ..schemas import CreateListingRequest, ListingResponse, SearchListingsRequest, SearchListingsResponse, AuctionResponse, BidRequest, PlaceBidResponse, UploadImageResponse
from ..models import Listing, User, Starred, Bid, Registration, Landmark, Image, Interaction, InteractionType
from ..helpers import get_session, get_current_user, get_signed_in_user, find_nearby_landmarks, add_listing_to_ML_model, get_highest_bid, map_bid_to_response, encode_continuation, decode_continuation, map_listing_response, map_listing_to_response, get_field_for_feature, get_auction_time_remaining, remove_listing_from_ML_model

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
    add_listing_to_ML_model(listing)
    return map_listing_to_response(listing, None, False, False)


@router.get('/', response_model=SearchListingsResponse)
# using a class dependency instead of method params because there's too many query params
def search(req: SearchListingsRequest = Depends(), current_user: Optional[User] = Depends(get_current_user), session: Session = Depends(get_session)):
    ''' Finds listings which match all of the specified criteria '''
    if req.is_user_query and current_user is not None:
        req_dict = asdict(req)
        # datetime values require special serialisation handling
        req_dict['auction_start'] = req.auction_start and req.auction_start.isoformat()
        req_dict['auction_end'] = req.auction_end and req.auction_end.isoformat()
        session.add(Interaction(user_id=current_user.id, type=InteractionType.search,
                                search_query=req_dict, timestamp=datetime.now()))
        session.commit()

    query: Query = session.query(Listing)
    # TODO: maybe extract this helper code
    conditions = []
    if req.location:
        # listing has an address component matching the `location` (case-insensitive)
        conditions.append(or_(
            Listing.suburb.ilike(req.location),
            Listing.street.ilike(req.location),
            Listing.postcode.ilike(req.location),
            Listing.state.ilike(req.location),
            Listing.country.ilike(req.location)
        ))
    if req.type:
        conditions.append(Listing.type == req.type)
    if req.num_bedrooms is not None:
        conditions.append(Listing.num_bedrooms == req.num_bedrooms)
    if req.num_bathrooms is not None:
        conditions.append(Listing.num_bathrooms == req.num_bathrooms)
    if req.num_car_spaces is not None:
        conditions.append(Listing.num_car_spaces == req.num_car_spaces)
    if req.auction_start:
        conditions.append(Listing.auction_start >= req.auction_start)
    if req.auction_end:
        conditions.append(Listing.auction_end <= req.auction_end)
    if req.features:
        # listing has all of the specified features
        conditions.extend(getattr(Listing, get_field_for_feature(feature)) == True
                          for feature in req.features)
    if req.landmarks:
        # listing has at least one nearby landmark for each of the specified types
        conditions.extend(Listing.landmarks.any(Landmark.type == landmark)
                          for landmark in req.landmarks)
    if not req.include_closed_auctions:
        # listing's auction cannot have ended
        conditions.append(Listing.auction_end > datetime.now())
    if req.continuation:
        # continue from last result
        (listing_id,) = decode_continuation(req.continuation)
        conditions.append(Listing.id > listing_id)

    results = query.filter(*conditions) \
        .order_by(Listing.id.asc()) \
        .limit(req.limit) \
        .all()

    responses = [map_listing_response(listing, current_user, session)
                 for listing in results]
    continuation = encode_continuation(results, req.limit)
    return {'results': responses, 'continuation': continuation}


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

    highest_bid = get_highest_bid(listing.id, session)
    assert highest_bid is not None  # user is registered so there must be >= 1 bid
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
    session.add(Interaction(user_id=signed_in_user.id, type=InteractionType.star,
                            listing_id=id, timestamp=datetime.now()))
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

    star_interaction = session.query(Interaction) \
        .filter_by(user_id=signed_in_user.id, type=InteractionType.star, listing_id=id) \
        .one_or_none()
    if star_interaction is not None:
        session.delete(star_interaction)

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

    images = [Image(listing_id=id, data=image.file.read(), image_type=image.content_type)
              for image in files]
    session.add_all(images)
    session.commit()
    return { 'ids': [image.id for image in images] }


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



@router.delete('/{listing_id}/images/{image_id}', responses={404: {"description": "Resource not found"}, 403: {"description": "Operation forbidden"}})
def delete_image(listing_id: int, image_id: int, signed_in_user: User = Depends(get_signed_in_user), session: Session = Depends(get_session)):
    ''' Delete an image '''
    listing = session.query(Listing).get(listing_id)
    if listing is None:
        raise HTTPException(
            status_code=404, detail="Requested listing could not be found")
    
    if signed_in_user.id != listing.owner_id:
        raise HTTPException(
            status_code=403, detail="User cannot delete images for this listing")

    image = session.query(Image).get(image_id)
    if image is None:
        raise HTTPException(
            status_code=404, detail="Requested image could not be found")
    
    session.delete(image)
    session.commit()
    

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
    remove_listing_from_ML_model(listing)
