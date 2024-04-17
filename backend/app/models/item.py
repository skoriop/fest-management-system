from pydantic import BaseModel
from typing import Optional

class Item(BaseModel):
    id: Optional[int] = None
    name: str
    description: int
    price: str
    non_veg: bool
    stock: int
    vendor_id: int