from dataclasses import dataclass
from datetime import datetime
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from .base import Base

@dataclass
class Registration(Base):
    __tablename__= 'registration'

    id: int = Column(Integer, primary_key=True)
    listing_id: int = Column(Integer, ForeignKey('listing.id'), nullable=False)
    user_id: int = Column(Integer, ForeignKey('user.id'), nullable=False)
    bid: int = Column(Integer, nullable=False)
    card_number: str = Column(String(), nullable=False)
    expiry: datetime = Column(DateTime, nullable=False)
    ccv: str = Column(String(), nullable=False)

    user = relationship('User', back_populates='registrations')
    listing = relationship('Listing', back_populates='bidders')

    def __repr__(self):
        return f"<User: {self.user.name} registered to bid for Listing: {self.listing.title}>"
