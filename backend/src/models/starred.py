from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship
from .base import Base


class Starred(Base):
    __tablename__ = 'starred'

    listing_id = Column(Integer, ForeignKey('listing.id', ondelete='CASCADE'),
                        primary_key=True)
    user_id = Column(Integer, ForeignKey('user.id', ondelete='CASCADE'),
                     primary_key=True)

    user = relationship('User', back_populates='starred_listings')
    listing = relationship('Listing')

    def __repr__(self):
        return f"<User: {self.user.name} starred Listing: {self.listing.title}>"
