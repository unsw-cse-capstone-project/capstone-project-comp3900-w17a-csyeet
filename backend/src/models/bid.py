from dataclasses import dataclass
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from .base import Base


@dataclass
class Bid(Base):
    __tablename__ = 'bid'

    listing_id: Column = Column(Integer, ForeignKey('listing.id', ondelete='CASCADE'),
                                primary_key=True)
    bidder_id: Column = Column(Integer, ForeignKey('user.id', ondelete='CASCADE'),
                               primary_key=True)
    bid: Column = Column(Integer, primary_key=True)
    placed_at: Column = Column(DateTime, nullable=False)

    user = relationship('User')
    listing = relationship('Listing', back_populates='bids')

    def __repr__(self):
        return f"<User: {self.user.name} placed Bid: {self.bid} for Listing: {self.listing.title}"
