from sqlalchemy import Column, Integer, ForeignKey, LargeBinary
from .base import Base


class Image(Base):
    __tablename__ = 'image'

    id = Column(Integer, primary_key=True)
    listing_id = Column(Integer, ForeignKey('listing.id', ondelete='CASCADE'), 
                        nullable=False)
    data = Column(LargeBinary, nullable=False)
    