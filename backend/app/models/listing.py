from backend.app import db
import enum

class ListingType(enum.Enum):
    house = 1
    apartment = 2
    townhouse = 3
    studio = 4
    duplex = 5

class Listing(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False,)
    type = db.Column(db.Enum(ListingType), nullable=False)
    title = db.Column(db.String(), nullable=False)
    description = db.Column(db.Text, nullable=False)
    street = db.Column(db.String(), nullable=False)
    suburb = db.Column(db.String(), nullable=False)
    postcode = db.Column(db.String(), nullable=False)
    state = db.Column(db.String(), nullable=False)
    country = db.Column(db.String(), nullable=False)
    num_bedrooms = db.Column(db.Integer, nullable=False)
    num_bathrooms = db.Column(db.Integer, nullable=False)
    num_car_spaces = db.Column(db.Integer, nullable=False)
    auction_start = db.Column(db.DateTime, nullable=False)
    auction_end = db.Column(db.DateTime, nullable=False)
    has_ensuite = db.Column(db.Boolean, default=False, nullable=False)
    has_built_in_wardrobe = db.Column(db.Boolean, default=False, nullable=False)
    has_bathtub = db.Column(db.Boolean, default=False, nullable=False)
    is_furnished = db.Column(db.Boolean, default=False, nullable=False)
    has_open_kitchen = db.Column(db.Boolean, default=False, nullable=False)
    has_separate_kitchen = db.Column(db.Boolean, default=False, nullable=False)
    has_island_kitchen = db.Column(db.Boolean, default=False, nullable=False)
    has_gas_stove = db.Column(db.Boolean, default=False, nullable=False)
    has_electric_stove = db.Column(db.Boolean, default=False, nullable=False)
    has_induction_stove = db.Column(db.Boolean, default=False, nullable=False)
    has_balcony = db.Column(db.Boolean, default=False, nullable=False)
    has_ocean_view = db.Column(db.Boolean, default=False, nullable=False)
    has_bbq = db.Column(db.Boolean, default=False, nullable=False)
    has_porch = db.Column(db.Boolean, default=False, nullable=False)
    has_pool = db.Column(db.Boolean, default=False, nullable=False)
    has_gym = db.Column(db.Boolean, default=False, nullable=False)

    def __repr__(self):
        return f"<Listing: {self.title}>"
        