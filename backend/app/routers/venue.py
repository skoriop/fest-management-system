import app.api.venue as venue_api
from app.models.venue import Venue
from fastapi import APIRouter, HTTPException

router = APIRouter()


@router.get("/venues")
async def get_venues():
    try:
        venues = venue_api.get_venues()
        if not venues:
            raise HTTPException(status_code=404, detail="No venues found")
        return {"message": "Success", "data": venues}
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred ${str(e)}")


@router.post("/venues/create")
async def create_venue(venue: Venue):
    try:
        created_venue = venue_api.create_venue(venue)
        return {"message": "Vendor created successfully", "data": created_venue}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred ${str(e)}")


@router.get("/venues/{venue_id}")
async def get_venue(venue_id: int):
    try:
        venue = venue_api.get_venue_by_id(venue_id)
        if not venue:
            raise HTTPException(status_code=404, detail="Venue not found")
        return {"message": "Success", "data": venue}
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred ${str(e)}")


@router.post("/venues/{venue_id}/update")
async def update_venue(venue_id: int, venue: Venue):
    try:
        updated_venue = venue_api.update_venue(venue_id, venue)
        return {"message": "Venue updated successfully", "data": updated_venue}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: ${str(e)}")


@router.post("/venues/{venue_id}/delete")
async def delete_venue(venue_id: int):
    try:
        venue_api.delete_venue(venue_id)
        return {"message": "Venue deleted successfully", "data": None}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: ${str(e)}")
