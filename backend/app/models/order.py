from pydantic import BaseModel
from datetime import datetime
from enum import Enum
from typing import Optional
from .cart_item import CartItem


class OrderStatus(str, Enum):
    placed = "Placed"
    ready = "Ready"
    done = "Done"


class Order(BaseModel):
    id: Optional[int] = None
    status: OrderStatus
    cart_items: list[CartItem] = []
    created_at: Optional[datetime] = None
    placed_by: Optional[int] = None
