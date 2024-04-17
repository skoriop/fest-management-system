from pydantic import BaseModel
from typing import Optional


class User(BaseModel):
    id: Optional[int] = None
    name: str
    phone_number: int
    email: str
    from_bits: bool
    bits_id: Optional[str] = None
    affiliation: Optional[str] = None
    spent: int = 0
