from datetime import datetime
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from .base import Base

class Registration(Base):
    __tablename__= 'registration'

    listing_id = Column(Integer, ForeignKey('listing.id'), primary_key=True, nullable=False)
    user_id = Column(Integer, ForeignKey('user.id'), primary_key=True, nullable=False)
    bid = Column(Integer, nullable=False)
    card_number = Column(String(), nullable=False)
    expiry = Column(DateTime, nullable=False)
    ccv = Column(String(), nullable=False)

    user = relationship('User', back_populates='registrations')
    listing = relationship('Listing', back_populates='bidders')

    def __repr__(self):
        return f"<User: {self.user.name} registered to bid for Listing: {self.listing.title}>"
