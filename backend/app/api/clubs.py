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
    
# Update a club by its id
def update_club_by_id(club_id: int, club: Club):
    query = """
        UPDATE clubs
        SET name = %(name)s, description = %(description)s, members = %(members)s
        WHERE id = %(id)s
        RETURNING *
    """
    with PgDatabase() as db:
        db.cursor.execute(query, vars(club))
        club_record = db.cursor.fetchone()
        db.connection.commit()
        return club_record
 
# Update a club's members by its id
def update_club_members(club_id: int, user_id: int):
    query = """
        UPDATE clubs_members
        SET user_id = %(user_id)s
        WHERE club_id = %(club_id)s
        RETURNING *
    """
    # TODO: Trigger to update member count in clubs table
    with PgDatabase() as db:
        db.cursor.execute(query, {'user_id': user_id, 'club_id': club_id})
        club_record = db.cursor.fetchone()
        db.connection.commit()
        return club_record