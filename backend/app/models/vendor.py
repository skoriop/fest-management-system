from pydantic import BaseModel
from typing import Optional


class Vendor(BaseModel):
    id: Optional[int] = None
    name: str
    description: str
