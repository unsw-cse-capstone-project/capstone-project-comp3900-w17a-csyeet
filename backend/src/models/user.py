from dataclasses import dataclass
from sqlalchemy import Column, Integer, String, Text, LargeBinary
from sqlalchemy.orm import relationship
from .base import Base


@dataclass
class User(Base):
    __tablename__ = 'user'

    id: Column = Column(Integer, primary_key=True)
    email: Column = Column(String(), unique=True, nullable=False)
    hashed_password: Column = Column(String(), nullable=False)
    name: Column = Column(String(), nullable=False)
    blurb: Column = Column(Text(), nullable=True)
    avatar_data: Column = Column(LargeBinary(), nullable=True)
    avatar_image_type: Column = Column(String(), nullable=True)
    phone_number: Column = Column(String(), nullable=False)
    street: Column = Column(String(), nullable=False)
    suburb: Column = Column(String(), nullable=False)
    postcode: Column = Column(String(), nullable=False)
    state: Column = Column(String(), nullable=False)
    country: Column = Column(String(), nullable=False)

    listings = relationship('Listing', back_populates='owner')
    registrations = relationship('Registration', back_populates='user')
    starred_listings = relationship('Starred', back_populates='user')

    def __repr__(self):
        return f"<User: {self.name}>"
