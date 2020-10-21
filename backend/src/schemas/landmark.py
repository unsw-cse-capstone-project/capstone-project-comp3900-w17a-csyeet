from enum import auto
from decimal import Decimal
from fastapi_utils.enums import CamelStrEnum
from pydantic import BaseModel


class LandmarkType(CamelStrEnum):
    primary_school = auto()
    secondary_school = auto()
    park = auto()
    train_station = auto()


class LandmarkReponse(BaseModel):
    name: str
    type: LandmarkType
    distance: Decimal

    class Config():
        orm_mode = True
