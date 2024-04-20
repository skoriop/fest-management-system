from app.db import PgDatabase
from app.models.user import User


# Creates a new user
def create_user(user: User):
    query = """
        INSERT INTO users (name, phone_number, email, from_bits, bits_id, affiliation, spent)
        VALUES (%(name)s, %(phone_number)s, %(email)s, %(from_bits)s, %(bits_id)s, %(affiliation)s, %(spent)s)
        RETURNING *
    """
    with PgDatabase() as db:
        db.cursor.execute(query, vars(user))
        user_record = db.cursor.fetchone()
        db.connection.commit()
        return user_record


# Gets a user by their ID
def get_user_by_id(user_id: int):
    query = """
        SELECT * FROM users WHERE id = %(user_id)s
    """
    with PgDatabase() as db:
        db.cursor.execute(query, {"user_id": user_id})
        user = db.cursor.fetchone()
        db.connection.commit()
        return user


def get_user_registrations(user_id: int):
    query = """
        SELECT * FROM events JOIN registrations ON events.id = registrations.event_id WHERE registrations.user_id = %(user_id)s
    """
    with PgDatabase() as db:
        db.cursor.execute(query, {"user_id": user_id})
        registrations = db.cursor.fetchall()
        db.connection.commit()
        return registrations


def get_user_clubs(user_id: int):
    query = """
        SELECT * FROM clubs JOIN club_members ON clubs.id = club_members.club_id WHERE club_members.user_id = %(user_id)s
    """
    with PgDatabase() as db:
        db.cursor.execute(query, {"user_id": user_id})
        clubs = db.cursor.fetchall()
        db.connection.commit()
        return clubs


# Update a user profile
def update_user(user_id: int, user: User):
    query = """
        UPDATE users
        SET name = %(name)s, phone_number = %(phone_number)s, email = %(email)s, from_bits = %(from_bits)s, bits_id = %(bits_id)s, affiliation = %(affiliation)s, spent = %(spent)s
        WHERE id = %(user_id)s
        RETURNING *
    """
    with PgDatabase() as db:
        db.cursor.execute(query, {"user_id": user_id, **vars(user)})
        new_user = db.cursor.fetchone()
        db.connection.commit()
        return new_user


# Delete a user
def delete_user(user_id: int):
    query = """
        DELETE FROM users WHERE id = %(user_id)s
    """
    with PgDatabase() as db:
        db.cursor.execute(query, {"user_id": user_id})
        db.connection.commit()
        return True


def get_user_by_email(email_id: str):
    query = """
        SELECT id FROM users WHERE email = %(email)s
    """
    with PgDatabase() as db:
        db.cursor.execute(query, {"email": email_id})
        user_id = db.cursor.fetchone()
        db.connection.commit()
        return user_id
