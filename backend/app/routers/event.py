from fastapi import APIRouter, HTTPException
import app.api.event as event_api
from app.models.event import Event

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
        if not events:
            raise HTTPException(status_code=404, detail="No Events found")
        return {"message": "Success", "data": events}
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: ${str(e)}")
