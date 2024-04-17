from app.db import PgDatabase
from app.models.clubs import Club, ClubMembers

# Creates a new club
def create_club(club: Club):
    query = """
        INSERT INTO clubs (name, description, members)
        VALUES (%(name)s, %(description)s, %(members)s)
        RETURNING *
    """
    with PgDatabase() as db:
        db.cursor.execute(query, vars(club))
        club_record = db.cursor.fetchone()
        db.connection.commit()
        return club_record
    
# Get a club by its id
def get_club_by_id(club_id: int):
    query = """
        SELECT * FROM clubs WHERE id = %(id)s
    """
    with PgDatabase() as db:
        db.cursor.execute(query, {'id': club_id})
        club_record = db.cursor.fetchone()
        return club_record

# Delete a club by its id
def delete_club_by_id(club_id: int):
    query = """
        DELETE FROM clubs WHERE id = %(id)s
    """
    with PgDatabase() as db:
        db.cursor.execute(query, {'id': club_id})
        db.connection.commit()
        return True