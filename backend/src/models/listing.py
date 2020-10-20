from dataclasses import dataclass
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Boolean, Enum, Text
from sqlalchemy.orm import relationship
from .base import Base
from ..schemas import ListingType


@dataclass
class Listing(Base):
    __tablename__ = 'listing'

    id: Column = Column(Integer, primary_key=True)
    owner_id: Column = Column(Integer, ForeignKey('user.id', ondelete='CASCADE'),
                              nullable=False)
    type: Column = Column(Enum(ListingType), nullable=False)
    title: Column = Column(String(), nullable=False)
    description: Column = Column(Text, nullable=False)
    street: Column = Column(String(), nullable=False)
    suburb: Column = Column(String(), nullable=False)
    postcode: Column = Column(String(), nullable=False)
    state: Column = Column(String(), nullable=False)
    country: Column = Column(String(), nullable=False)
    num_bedrooms: Column = Column(Integer, nullable=False)
    num_bathrooms: Column = Column(Integer, nullable=False)
    num_car_spaces: Column = Column(Integer, nullable=False)
    auction_start: Column = Column(DateTime, nullable=False)
    auction_end: Column = Column(DateTime, nullable=False)
    has_ensuite: Column = Column(Boolean, default=False, nullable=False)
    has_built_in_wardrobe: Column = Column(Boolean, default=False,
                                           nullable=False)
    has_bathtub: Column = Column(Boolean, default=False, nullable=False)
    is_furnished: Column = Column(Boolean, default=False, nullable=False)
    has_open_kitchen: Column = Column(Boolean, default=False, nullable=False)
    has_separate_kitchen: Column = Column(Boolean, default=False,
                                          nullable=False)
    has_island_kitchen: Column = Column(Boolean, default=False, nullable=False)
    has_gas_stove: Column = Column(Boolean, default=False, nullable=False)
    has_electric_stove: Column = Column(Boolean, default=False, nullable=False)
    has_induction_stove: Column = Column(Boolean, default=False,
                                         nullable=False)
    has_balcony: Column = Column(Boolean, default=False, nullable=False)
    has_ocean_view: Column = Column(Boolean, default=False, nullable=False)
    has_bbq: Column = Column(Boolean, default=False, nullable=False)
    has_porch: Column = Column(Boolean, default=False, nullable=False)
    has_pool: Column = Column(Boolean, default=False, nullable=False)
    has_gym: Column = Column(Boolean, default=False, nullable=False)

    owner = relationship('User', back_populates='listings')
    bidders = relationship('Registration', back_populates='listing')
    landmarks = relationship('Landmark')

    def __repr__(self):
        return f"<Listing: {self.title}>"
