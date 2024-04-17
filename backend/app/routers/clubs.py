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
    
@router.get("/{club_id}")
async def get_club(club_id: int):
    try:
        club = clubs_api.get_club_by_id(club_id)
        if not club:
            raise HTTPException(status_code=404, detail="Club not found")
        return {
            'message': None,
            'data': club
        }
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
    
@router.post("/{club_id}/update")
async def update_club(club_id: int, club: Club):
    try:
        updated_club = clubs_api.update_club_by_id(club_id, club)
        return {
            'message': 'Club updated successfully',
            'data': updated_club
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
    
@router.post("/{club_id}/delete")
async def delete_club(club_id: int):
    try:
        clubs_api.delete_club_by_id(club_id)
        return {
            'message': 'Club deleted successfully',
            'data': None
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")