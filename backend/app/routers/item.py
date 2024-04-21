from fastapi import APIRouter, HTTPException
import app.api.item as item_api
from app.models.item import Item

router = APIRouter()


@router.post("/vendor/{vendor_id}/items/create")
async def create(vendor_id: int, item: Item):
    try:
        item.vendor_id = vendor_id
        created_item = item_api.create_item(item)
        return {"message": "Item created successfully", "data": created_item}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: ${str(e)}")


@router.get("/items/{item_id}")
async def get(item_id: int):
    try:
        item = item_api.get_item_by_id(item_id)
        if not item:
            raise HTTPException(status_code=404, detail="Item not found")
        return {"message": None, "data": item}
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: ${str(e)}")


@router.post("/vendor/{vendor_id}/items/{item_id}/update")
async def update(vendor_id: int, item_id: int, item: Item):
    try:
        item.vendor_id = vendor_id
        updated_item = item_api.update_item(item_id, item)
        return {"message": "Item updated successfully", "data": updated_item}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: ${str(e)}")


@router.post("/vendor/{vendor_id}/items/{item_id}/delete")
async def delete_item(vendor_id: int, item_id: int):
    try:
        item_api.delete_item(vendor_id, item_id)
        return {"message": "Item deleted successfully", "data": None}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: ${str(e)}")


@router.get("/vendor/{vendor_id}/orders")
async def get_vendor_orders_by_id(vendor_id: int):
    try:
        orders = item_api.get_vendor_orders_by_id(vendor_id)
        return {"message": "Success", "data": orders}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: ${str(e)}")


@router.get("/vendor/{vendor_id}/items")
async def get_all_vendor_items(vendor_id: int):
    try:
        items = item_api.get_all_vendor_items(vendor_id)
        return {"message": "Success", "data": items}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: ${str(e)}")
