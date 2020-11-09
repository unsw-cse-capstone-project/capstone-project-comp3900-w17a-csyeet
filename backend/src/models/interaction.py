from enum import Enum, auto
from sqlalchemy import Column, Integer, ForeignKey, Enum as EnumColumn, JSON, DateTime
from sqlalchemy.orm import relationship
from .base import Base


class InteractionType(Enum):
    search = auto()
    registration = auto()
    star = auto()


class Interaction(Base):
    __tablename__ = 'interaction'

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('user.id', ondelete='CASCADE'),
                     # index this column since we always filter by it and there could be lots of records in the table
                     nullable=False, index=True)
    type = Column(EnumColumn(InteractionType), nullable=False)
    listing_id = Column(Integer, ForeignKey('listing.id', ondelete='CASCADE'),
                        nullable=True)
    search_query = Column(JSON, nullable=True)
    timestamp = Column(DateTime, nullable=False, index=True)

    listing = relationship('Listing')
