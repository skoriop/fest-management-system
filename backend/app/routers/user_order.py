from fastapi import APIRouter, HTTPException
import app.api.user_order as user_order_api
from app.models.order import Order

router = APIRouter()


@router.post("/user/{user_id}/orders/create")
async def create(user_id: int, order: Order):
    try:
        order.placed_by = user_id
        created_order = user_order_api.create_order(order)
        return {"message": "Order created successfully", "data": created_order}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: ${str(e)}")


@router.get("/user/{user_id}/orders")
async def get_orders(user_id: int):
    try:
        orders = user_order_api.get_orders(user_id)
        return {"message": "Success", "data": orders}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: ${str(e)}")


@router.get("/user/{user_id}/orders/{order_id}")
async def get_order_by_id(user_id: int, order_id: int):
    try:
        order = user_order_api.get_order_by_id(user_id, order_id)
        if not order:
            raise HTTPException(status_code=404, detail="Order not found")
        return {"message": None, "data": order}
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: ${str(e)}")


@router.post("/user/{user_id}/orders/{order_id}/delete")
async def delete_order(user_id: int, order_id: int):
    try:
        user_order_api.delete_order(user_id, order_id)
        return {"message": "Order deleted successfully", "data": None}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: ${str(e)}")
