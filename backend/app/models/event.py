from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class Event(BaseModel):
    id: Optional[int] = None
    name: str
    description: str
    start_time: datetime
    end_time: datetime
    duration: Optional[datetime] = None
    created_at: Optional[datetime] = None
    last_updated: Optional[datetime] = None
    fee: int
    registrations: Optional[int] = None
    organizer_id: int
