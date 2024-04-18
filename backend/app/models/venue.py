from typing import Optional
from pydantic import BaseModel

class Venue(BaseModel):
    id: Optional[int] = None
    name: str
    capacity: int
    type: str

class VenueEvent(BaseModel):
     venue_id: int
     event_id: int