from pydantic import BaseModel
from typing import Optional


class CartItem(BaseModel):
    order_id: Optional[int] = None
    item_id: int
    quantity: int = 1
