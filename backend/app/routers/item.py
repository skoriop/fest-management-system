from fastapi import APIRouter, HTTPException
import app.api.item as item_api
from app.models.item import Item

router = APIRouter()

@router.post('/{vendor_id}/items/create')
async def create(vendor_id: int,item: Item):
    try:
        item.vendor_id = vendor_id
        created_item = item_api.create_item(item)
        return {
            'message': 'Item created successfully',
            'data': created_item
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f'An error occurred: ${str(e)}')

