from fastapi import APIRouter, HTTPException
import app.api.vendor as vendor_api
from app.models.vendor import Vendor

router = APIRouter()

@router.post('/create')
async def create(vendor: Vendor):
    try:
        created_vendor = vendor_api.create_vendor(vendor)
        return {
            'message': 'Vendor created successfully',
            'data': created_vendor
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f'An error occurred: ${str(e)}')

