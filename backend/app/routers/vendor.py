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

@router.get('/{vendor_id}')
async def get(vendor_id: int):
    try:
        vendor = vendor_api.get_vendor_by_id(vendor_id)
        if not vendor:
            raise HTTPException(status_code=404, detail='Vendor not found')
        return {
            'message': None,
            'data': vendor
        }
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=f'An error occurred: ${str(e)}')

@router.post('/{vendor_id}/update')
async def update(vendor_id: int, vendor: Vendor):
    try:
        updated_vendor = vendor_api.update_vendor(vendor_id, vendor)
        return {
            'message': 'Vendor updated successfully',
            'data': updated_vendor
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f'An error occurred: ${str(e)}')

@router.post('/{vendor_id}/delete')
async def delete_vendor(vendor_id: int):
    try:
        vendor_api.delete_vendor(vendor_id)
        return {
            'message': 'Vendor deleted successfully',
            'data': None
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f'An error occurred: ${str(e)}')

@router.get('/')
async def get():
    try:
        vendors = vendor_api.get_all_vendors()
        if not vendors:
            raise HTTPException(status_code=404, detail='No Vendors found')
        return {
            'message': 'Success',
            'data': vendors
        }
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=f'An error occurred: ${str(e)}')