import app
from app.crud.user import *
from app.models.user import User

# Create User route
@app.post('/user/create')
async def create_user(user: User):
    try:
        user_id = create_user(user)
        created_user = get_user_by_id(user_id)
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
    
# Get User by ID route
@app.get('/user/{user_id}/')
async def get_user(user_id: int):
    try:
        user = get_user_by_id(user_id)
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