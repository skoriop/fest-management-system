import app.api.event as event_api
from app.models.event import Event
from fastapi import APIRouter, HTTPException

router = APIRouter()


@router.post("/events/create")
async def create(event: Event):
    try:
        created_event = event_api.create_event(event)
        return {"message": "Event created successfully", "data": created_event}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: ${str(e)}")


@router.get("/events/{event_id}")
async def get(event_id: int):
    try:
        event = event_api.get_event_by_id(event_id)
        if not event:
            raise HTTPException(status_code=404, detail="Event not found")
        return {"message": None, "data": event}
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: ${str(e)}")


@router.get("/events/{event_id}/registrations")
async def get_event_registrations(event_id: int):
    try:
        registrations = event_api.get_event_registrations(event_id)
        return {"message": None, "data": registrations}
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: ${str(e)}")


@router.post("/events/{event_id}/update")
async def update(event_id: int, event: Event):
    try:
        updated_event = event_api.update_event(event_id, event)
        return {"message": "Event updated successfully", "data": updated_event}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: ${str(e)}")


@router.post("/events/{event_id}/delete")
async def delete_event(event_id: int):
    try:
        event_api.delete_event(event_id)
        return {"message": "Event deleted successfully", "data": None}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: ${str(e)}")


@router.get("/events")
async def get_all_events():
    try:
        events = event_api.get_all_events()
        return {"message": None, "data": events}
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: ${str(e)}")


@router.post("/events/{event_id}/register/{email}")
async def update(event_id: int, email: str):
    try:
        registration = event_api.register_for_event(email, event_id)
        if not registration:
            raise HTTPException(status_code=404, detail="User not found")
        return {"message": "Event registered successfully", "data": registration}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: ${str(e)}")
