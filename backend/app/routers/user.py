from fastapi import APIRouter
import app.api.user as user_api
from app.models.user import User

router = APIRouter()

@router.post('/create')
async def create(user: User):
    try:
        user_id = user_api.create_user(user)
        created_user = user_api.get_user_by_id(user_id)
        return {
            'error': False,
            'message': 'User created successfully',
            'data': created_user
        }
    except Exception as e:
        return {
            'error': True,
            'message': 'An error occurred: ' + str(e),
            'data': None
        }
    
@router.get('/{user_id}')
async def get(user_id: int):
    try:
        user = user_api.get_user_by_id(user_id)
        return {
            'error': False,
            'message': None,
            'data': user
        }
    except Exception as e:
        return {
            'error': True,
            'message': 'An error occurred: ' + str(e),
            'data': None
        }

@router.post('/{user_id}/update')
async def update(user_id: int, user: User):
    try:
        updated_user = user_api.update_user(user_id, user)
        return {
            'error': False,
            'message': 'User updated successfully',
            'data': updated_user
        }
    except Exception as e:
        return {
            'error': True,
            'message': 'An error occurred: ' + str(e),
            'data': None
        }
    
@router.post('/{user_id}/delete')
async def delete_user(user_id: int):
    try:
        user_api.delete_user(user_id)
        return {
            'error': False,
            'message': 'User deleted successfully',
            'data': None
        }
    except Exception as e:
        return {
            'error': True,
            'message': 'An error occurred: ' + str(e),
            'data': None
        }