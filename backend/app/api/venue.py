from app.db import PgDatabase
from app.models.venue import Venue


def create_venue(venue: Venue):
    query = """
        INSERT INTO venues (name, capacity, type)
        VALUES (%(name)s, %(capacity)s, %(type)s)
        RETURNING *
    """
    with PgDatabase() as db:
        db.cursor.execute(query, vars(venue))
        venue_record = db.cursor.fetchone()
        db.connection.commit()
        return venue_record


def get_venue_by_id(venue_id: int):
    query = """
        SELECT * FROM venues WHERE id = %(venue_id)s
    """
    with PgDatabase() as db:
        db.cursor.execute(query, {"venue_id": venue_id})
        venue = db.cursor.fetchone()
        db.connection.commit()
        return venue


def update_venue(venue_id: int, venue: Venue):
    query = """
        UPDATE venues
        SET name = %(name)s, capacity = %(capacity)s, type = %(type)s
        WHERE id = %(venue_id)s
        RETURNING *
    """
    with PgDatabase() as db:
        db.cursor.execute(query, {"venue_id": venue_id, **vars(venue)})
        new_venue = db.cursor.fetchone()
        db.connection.commit()
        return new_venue


def delete_venue(venue_id: int):
    query = """
        DELETE FROM venues WHERE id = %(venue_id)s
    """
    with PgDatabase() as db:
        db.cursor.execute(query, {"venue_id": venue_id})
        db.connection.commit()
        return True


def get_venues():
    query = """
        SELECT * FROM venues
    """
    with PgDatabase() as db:
        db.cursor.execute(query)
        venues = db.cursor.fetchall()
        db.connection.commit()
        return venues
