from app.db import PgDatabase
from app.models.clubs import Club


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
        db.cursor.execute(query, {"id": club_id})
        club_record = db.cursor.fetchone()
        return club_record


# Get all members of a club
def get_club_members(club_id: int):
    query = """
        SELECT * FROM users JOIN club_members ON users.id = club_members.user_id WHERE club_members.club_id = %(club_id)s
    """
    with PgDatabase() as db:
        db.cursor.execute(query, {"club_id": club_id})
        club_members = db.cursor.fetchall()
        return club_members


def get_club_revenue(club_id: int):
    query = """
        SELECT get_club_revenue(%(club_id)s) AS revenue
    """
    with PgDatabase() as db:
        db.cursor.execute(query, {"club_id": club_id})
        revenue = db.cursor.fetchone()
        return revenue


def get_all_clubs():
    query = """
        SELECT * FROM clubs
    """
    with PgDatabase() as db:
        db.cursor.execute(query)
        clubs = db.cursor.fetchall()
        return clubs


# Delete a club by its id
def delete_club_by_id(club_id: int):
    query = """
        DELETE FROM clubs WHERE id = %(id)s
    """
    with PgDatabase() as db:
        db.cursor.execute(query, {"id": club_id})
        db.connection.commit()
        return True


# Update a club by its id
def update_club_by_id(club_id: int, club: Club):
    query = """
        UPDATE clubs
        SET name = %(name)s, description = %(description)s, members = %(members)s
        WHERE id = %(club_id)s
        RETURNING *
    """
    with PgDatabase() as db:
        db.cursor.execute(query, {"club_id": club_id, **vars(club)})
        club_record = db.cursor.fetchone()
        db.connection.commit()
        return club_record


# Get all events of a club
def get_club_events(club_id: int):
    query = """
        SELECT * FROM events WHERE organizer_id = %(club_id)s
    """
    with PgDatabase() as db:
        db.cursor.execute(query, {"club_id": club_id})
        club_events = db.cursor.fetchall()
        return club_events


# Add a member to a club
def add_club_member(club_id: int, email: str):
    query1 = """
        SELECT id FROM users  WHERE email = %(email_id)s"""
    query2 = """
        INSERT INTO club_members (club_id, user_id)
        VALUES (%(club_id)s, %(user_id)s)
        RETURNING *
    """
    # TODO: Trigger to update member count in clubs table
    with PgDatabase() as db:
        db.cursor.execute(query1, {"email_id": email})
        user_id = db.cursor.fetchone()
        if not user_id:
            return None
        db.cursor.execute(query2, {"user_id": user_id["id"], "club_id": club_id})
        club_record = db.cursor.fetchone()
        db.connection.commit()
        return club_record


# Remove a member from the club
def remove_club_member(club_id: int, email: str):
    query1 = """
        SELECT id FROM users  WHERE email = %(email_id)s"""
    query2 = """
        DELETE FROM club_members WHERE
        club_id = %(club_id)s AND user_id = %(user_id)s
        RETURNING *
    """
    # TODO: Trigger to update member count in clubs table
    with PgDatabase() as db:
        db.cursor.execute(query1, {"email_id": email})
        user_id = db.cursor.fetchone()
        if not user_id:
            return None
        db.cursor.execute(query2, {"user_id": user_id["id"], "club_id": club_id})
        club_record = db.cursor.fetchone()
        db.connection.commit()
        return club_record
