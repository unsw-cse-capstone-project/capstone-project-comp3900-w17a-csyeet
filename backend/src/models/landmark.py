from sqlalchemy import Column, Integer, String, ForeignKey, Enum, DECIMAL
from ..schemas import LandmarkType
from .base import Base


class Landmark(Base):
    __tablename__ = 'landmark'

    id = Column(Integer, primary_key=True)
    listing_id = Column(Integer, ForeignKey('listing.id', ondelete='CASCADE'),
                        nullable=False)
    name = Column(String, nullable=False)
    type = Column(Enum(LandmarkType), nullable=False)
    distance = Column(DECIMAL(precision=4, scale=2), nullable=False)
