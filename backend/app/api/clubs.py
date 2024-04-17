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