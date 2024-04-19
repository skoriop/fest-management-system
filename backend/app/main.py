from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from starlette.exceptions import HTTPException as StarletteHTTPException
from .routers import user, item, vendor, clubs, venue


app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.exception_handler(StarletteHTTPException)
async def http_exception_handler(request, exc):
    return JSONResponse(
        status_code=exc.status_code if exc.status_code is not None else 500,
        content={"message": exc.detail, "data": None},
    )



app.include_router(user.router, prefix="/user")
app.include_router(item.router, prefix="/vendor")
app.include_router(vendor.router, prefix="/vendor")
app.include_router(clubs.router, prefix='/clubs')
app.include_router(venue.router, prefix='/venues')

@app.get("/")
async def index():
    return {"message": "App"}
