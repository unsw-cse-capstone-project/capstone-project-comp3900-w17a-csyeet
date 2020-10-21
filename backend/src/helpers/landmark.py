from decimal import Decimal
from typing import List
import googlemaps
# from geopy.geocoders import Nominatim
# from geopy.distance import distance
from ..models import Listing, Landmark
from ..schemas import LandmarkType

gmaps_client = googlemaps.Client(key='AIzaSyDakTtp6izOGX7zI_rWxT3a8E6rCX1gaso')


def find_nearby_landmarks(listing: Listing) -> List[Landmark]:
    return [
        Landmark(listing_id=listing.id, name="Primary School",
                 type=LandmarkType.primary_school, distance=Decimal('2.21')),
        Landmark(listing_id=listing.id, name="Secondary School",
                 type=LandmarkType.secondary_school, distance=Decimal('2.01')),
        Landmark(listing_id=listing.id, name="Park",
                 type=LandmarkType.park, distance=Decimal('1.01')),
        Landmark(listing_id=listing.id, name="Train Station",
                 type=LandmarkType.train_station, distance=Decimal('0.91')),
    ]
