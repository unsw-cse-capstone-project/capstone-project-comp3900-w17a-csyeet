from datetime import datetime
from dataclasses import dataclass
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Boolean, Enum, Text
from sqlalchemy.orm import relationship
from .base import Base
from ..schemas import ListingType


@dataclass
class Listing(Base):
    __tablename__ = 'listing'

    id: int = Column(Integer, primary_key=True)
    owner_id = Column(Integer, ForeignKey('user.id'), nullable=False)
    type: ListingType = Column(Enum(ListingType), nullable=False)
    title: str = Column(String(), nullable=False)
    description: str = Column(Text, nullable=False)
    street: str = Column(String(), nullable=False)
    suburb: str = Column(String(), nullable=False)
    postcode: str = Column(String(), nullable=False)
    state: str = Column(String(), nullable=False)
    country: str = Column(String(), nullable=False)
    num_bedrooms: int = Column(Integer, nullable=False)
    num_bathrooms: int = Column(Integer, nullable=False)
    num_car_spaces: int = Column(Integer, nullable=False)
    auction_start: datetime = Column(DateTime, nullable=False)
    auction_end: datetime = Column(DateTime, nullable=False)
    has_ensuite: bool = Column(Boolean, default=False, nullable=False)
    has_built_in_wardrobe: bool = Column(
        Boolean, default=False, nullable=False)
    has_bathtub: bool = Column(Boolean, default=False, nullable=False)
    is_furnished: bool = Column(Boolean, default=False, nullable=False)
    has_open_kitchen: bool = Column(Boolean, default=False, nullable=False)
    has_separate_kitchen: bool = Column(Boolean, default=False, nullable=False)
    has_island_kitchen: bool = Column(Boolean, default=False, nullable=False)
    has_gas_stove: bool = Column(Boolean, default=False, nullable=False)
    has_electric_stove: bool = Column(Boolean, default=False, nullable=False)
    has_induction_stove: bool = Column(Boolean, default=False, nullable=False)
    has_balcony: bool = Column(Boolean, default=False, nullable=False)
    has_ocean_view: bool = Column(Boolean, default=False, nullable=False)
    has_bbq: bool = Column(Boolean, default=False, nullable=False)
    has_porch: bool = Column(Boolean, default=False, nullable=False)
    has_pool: bool = Column(Boolean, default=False, nullable=False)
    has_gym: bool = Column(Boolean, default=False, nullable=False)

    owner = relationship('User', back_populates='listings')
    bidders = relationship('Registration', back_populates='listing')

    def __repr__(self):
        return f"<Listing: {self.title}>"
