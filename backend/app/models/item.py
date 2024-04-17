from pydantic import BaseModel
from typing import Optional

class Item(BaseModel):
    id: Optional[int] = None
    name: str
    description: str
    price: int
    non_veg: bool
    stock: int
    vendor_id: Optional[int] = None