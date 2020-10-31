from sqlalchemy import Column, Integer, String, ForeignKey, LargeBinary
from .base import Base


class Profile_Image(Base):
    __tablename__ = 'profile_image'

    user_id = Column(Integer, ForeignKey('user.id', ondelete='CASCADE'),
                     primary_key=True)
    data = Column(LargeBinary, nullable=False)
    image_type = Column(String, nullable=False)
