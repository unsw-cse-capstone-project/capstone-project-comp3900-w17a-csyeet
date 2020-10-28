import base64
from typing import List, Optional, Tuple
from ..models import Listing


def encode_continuation(results: List[Listing], limit: int) -> Optional[str]:
    return base64.urlsafe_b64encode(str(results[-1].id).encode()).decode() if len(results) == limit else None


def decode_continuation(continuation: str) -> Tuple[int]:
    return int(base64.urlsafe_b64decode(continuation).decode()),
