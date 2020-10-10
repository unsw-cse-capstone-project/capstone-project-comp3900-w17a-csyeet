from backend.app import db
import enum

class ListingType(enum.Enum):
    house = 1
    apartment = 2
    townhouse = 3
    studio = 4
    duplex = 5

class Property(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, nullable=False)
    title = db.Column(db.String(), nullable=False)
    street = db.Column(db.String(), nullable=False)
    suburb = db.Column(db.String(), nullable=False)
    postcode = db.Column(db.Integer, nullable=False)
    state = db.Column(db.String(), nullable=False)
    country = db.Column(db.String(), nullable=False)
    listing_type = db.Column(db.Enum(ListingType), nullable=False)
    num_bedrooms = db.Column(db.Integer, nullable=False)
    num_bathrooms = db.Column(db.Integer, nullable=False)
    num_car_spaces = db.Column(db.Integer, nullable=False)
    auction_start = db.Column(db.DateTime, nullable=False)
    auction_end = db.Column(db.DateTime, nullable=False)
    description = db.Column(db.Text)
    features = db.Column(db.Text)

    def __repr__(self):
        return f"<Property: {self.title}>"
        