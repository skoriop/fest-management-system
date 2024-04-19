from app.db import PgDatabase
from app.models.event import Event


def create_event(event: Event):
    main_query = """
        INSERT INTO events (name, description,start_time,end_time,fee,organizer_id)
        VALUES (%(name)s, %(description)s,%(start_time)s,%(end_time)s,%(fee)s,%(organizer_id)s)
        RETURNING *
    """
    join_query = """
        INSERT INTO venue_events (venue_id, event_id)
        VALUES (%(venue_id)s, %(event_id)s)
    """
    with PgDatabase() as db:
        db.cursor.execute(main_query, vars(event))
        event_record = db.cursor.fetchone()
        if event.venues is not None:
            for venue_id in event.venues:
                db.cursor.execute(
                    join_query, {"venue_id": venue_id, "event_id": event_record["id"]}
                )
        db.connection.commit()
        return event_record


def get_event_by_id(event_id: int):
    main_query = """
        SELECT * FROM events WHERE id = %(event_id)s
    """
    join_query = """
        SELECT * FROM venues v
        JOIN venue_events ve ON v.id = ve.venue_id
        WHERE ve.event_id = %(event_id)s
    """
    with PgDatabase() as db:
        db.cursor.execute(main_query, {"event_id": event_id})
        event = db.cursor.fetchone()
        if event is not None:
            db.cursor.execute(join_query, {"event_id": event_id})
            event["venues"] = db.cursor.fetchall()
        db.connection.commit()
        return event


def update_event(event_id: int, event: Event):
    query = """
        UPDATE events
        SET name = %(name)s, description = %(description)s,start_time = %(start_time)s,end_time = %(end_time)s,fee = %(fee)s,organizer_id = %(organizer_id)s
        WHERE id = %(event_id)s
        RETURNING *
    """
    with PgDatabase() as db:
        db.cursor.execute(query, {"event_id": event_id, **vars(event)})
        new_event = db.cursor.fetchone()
        db.connection.commit()
        return new_event


def delete_event(event_id: int):
    query = """
        DELETE FROM events WHERE id = %(event_id)s
    """
    with PgDatabase() as db:
        db.cursor.execute(query, {"event_id": event_id})
        db.connection.commit()
        return True


def get_all_events():
    query = """
        SELECT * FROM events
    """
    with PgDatabase() as db:
        db.cursor.execute(query)
        events = db.cursor.fetchall()
        return events
