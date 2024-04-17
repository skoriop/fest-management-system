from pydantic import BaseModel
from typing import Optional

class vendor(BaseModel):
    id: Optional[int] = None
    name: str
    description: str