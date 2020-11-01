from typing import List
from pydantic import BaseModel
from .listing import ListingResponse


class InteractionsRecommendations(BaseModel):
    recommendations: List[ListingResponse]
