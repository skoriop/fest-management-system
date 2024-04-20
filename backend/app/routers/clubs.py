import app.api.clubs as clubs_api
from app.models.clubs import Club, ClubMember
from fastapi import APIRouter, HTTPException

router = APIRouter()


@router.post("/clubs/create")
async def create_club(club: Club):
    try:
        created_club = clubs_api.create_club(club)
        return {"message": "Club created successfully", "data": created_club}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")


@router.get("/clubs/{club_id}")
async def get_club(club_id: int):
    try:
        club = clubs_api.get_club_by_id(club_id)
        if not club:
            raise HTTPException(status_code=404, detail="Club not found")
        return {"message": "Success", "data": club}
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")


@router.get("/clubs/{club_id}/members")
async def get_club_members(club_id: int):
    try:
        members = clubs_api.get_club_members(club_id)
        return {"message": "Success", "data": members}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")


@router.get("/clubs")
async def get_all_clubs():
    try:
        clubs = clubs_api.get_all_clubs()
        if not clubs:
            raise HTTPException(status_code=404, detail="No Clubs found")
        return {"message": "Success", "data": clubs}
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: ${str(e)}")


@router.post("/clubs/{club_id}/update")
async def update_club(club_id: int, club: Club):
    try:
        updated_club = clubs_api.update_club_by_id(club_id, club)
        return {"message": "Club updated successfully", "data": updated_club}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")


@router.post("/clubs/{club_id}/add_member/{email}")
async def add_club_member(club_id: int, email: str):
    try:
        updated_club = clubs_api.add_club_member(club_id, email)
        if not updated_club:
            raise HTTPException(status_code=404, detail="User not found")
        return {"message": "Club updated successfully", "data": updated_club}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")


@router.post("/clubs/{club_id}/remove_member")
async def remove_club_member(club_id: int, user: ClubMember):
    try:
        updated_club = clubs_api.remove_club_member(club_id, user.id)
        return {"message": "Club updated successfully", "data": updated_club}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")


@router.post("/clubs/{club_id}/delete")
async def delete_club(club_id: int):
    try:
        clubs_api.delete_club_by_id(club_id)
        return {"message": "Club deleted successfully", "data": None}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
