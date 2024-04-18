from typing import Optional
from pydantic import BaseModel

class Venue(BaseModel):
    id: Optional[int] = None
    name: str
    capacity: int
    type: str