from fastapi import APIRouter, HTTPException
import app.api.clubs as clubs_api
from app.models.clubs import Club, ClubMembers

router = APIRouter()

@router.post("/create")
async def create_club(club: Club):
    try:
        created_club = clubs_api.create_club(club)
        return {
            'message': 'Club created successfully',
            'data': created_club
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")