from fastapi import APIRouter, HTTPException
import app.api.user as user_api
from app.models.user import User

router = APIRouter()


@router.post("/user/create")
async def create(user: User):
    try:
        created_user = user_api.create_user(user)
        return {"message": "User created successfully", "data": created_user}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: ${str(e)}")


@router.get("/user/{user_id}")
async def get(user_id: int):
    try:
        user = user_api.get_user_by_id(user_id)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        return {"message": None, "data": user}
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: ${str(e)}")


@router.post("/user/{user_id}/update")
async def update(user_id: int, user: User):
    try:
        updated_user = user_api.update_user(user_id, user)
        return {"message": "User updated successfully", "data": updated_user}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: ${str(e)}")


@router.post("/user/{user_id}/delete")
async def delete_user(user_id: int):
    try:
        user_api.delete_user(user_id)
        return {"message": "User deleted successfully", "data": None}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: ${str(e)}")
