from app.db import PgDatabase
from app.models.venue import Venue, VenueEvent

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
        db.cursor.execute(query, {'venue_id': venue_id})
        venue = db.cursor.fetchone()
        db.connection.commit()
        return venue