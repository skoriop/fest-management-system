from pydantic import BaseModel
from typing import Optional

class Club(BaseModel):
    id: Optional[int] = None
    name: str
    description: str
    members: int = 0

class ClubMembers(BaseModel):
    club_id: int
    user_id: int