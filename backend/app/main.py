from fastapi import FastAPI
from .routers import user

app = FastAPI()
app.include_router(user.router, prefix='/user')

@app.get('/')
async def index():
    return {'message': 'App'}