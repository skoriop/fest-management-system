from typing import Optional

from pydantic import BaseModel


class Club(BaseModel):
    id: Optional[int] = None
    name: str
    description: str
    members: int = 0


