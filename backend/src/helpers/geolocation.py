from typing import Tuple, Optional
from geopy.geocoders import Nominatim
from geopy.location import Location
from ratelimiter import RateLimiter
from ..models import Listing

geolocator = Nominatim(user_agent="Abode")
# shared limiter to restrict total calls to Nominatim to a maximum of once per second
rate_limiter = RateLimiter(max_calls=1, period=1)


@rate_limiter
def get_listing_coordinates(listing: Listing) -> Optional[Tuple[float, float]]:
    address_details = {'street': listing.street, 'state': listing.state,
                       'country': listing.country, 'postalcode': listing.postcode}
    location: Location = geolocator.geocode(address_details)
    return (location.latitude, location.longitude) if location is not None else None


@rate_limiter
def convert_address_to_postcode(address: str) -> Optional[str]:
    location: Location = geolocator.geocode(address, addressdetails=True)
    return location.raw['address'].get('postcode') if location is not None else None
