from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from .base import Base


class User(Base):
    __tablename__ = 'user'

    id = Column(Integer, primary_key=True)
    email = Column(String(), unique=True, nullable=False)
    hashed_password = Column(String(), nullable=False)
    name = Column(String(), nullable=False)

    listings = relationship('Listing', back_populates='owner')
    registrations = relationship('Registration', back_populates='user')
    starred_listings = relationship('Starred', back_populates='user')

    def __repr__(self):
        return f"<User: {self.name}>"
