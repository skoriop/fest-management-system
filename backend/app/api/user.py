from app.db import PgDatabase
from app.models.user import User

# Creates a new user
def create_user(user: User):
    query = """
        INSERT INTO users (name, phone_number, email, from_bits, bits_id, affiliation, spent)
        VALUES (%(name)s, %(phone_number)s, %(email)s, %(from_bits)s, %(bits_id)s, %(affiliation)s, %(spent)s)
        RETURNING id
    """
    with PgDatabase() as db:
        user_id = db.cursor.execute(query, vars(user))
        db.connection.commit()
        return user_id
    
# Gets a user by their ID
def get_user_by_id(user_id: int):
    query = """
        SELECT * FROM users WHERE id = %(user_id)s
    """
    with PgDatabase() as db:
        db.cursor.execute(query, {'user_id': user_id})
        user = db.cursor.fetchone()
        db.connection.commit()
        return user

# Update a user profile
def update_user(user_id: int, user: User):
    query = """
        UPDATE users
        SET name = %(name)s, phone_number = %(phone_number)s, email = %(email)s, from_bits = %(from_bits)s, bits_id = %(bits_id)s, affiliation = %(affiliation)s, spent = %(spent)s
        WHERE id = %(user_id)s
    """
    with PgDatabase() as db:
        db.cursor.execute(query, {'user_id': user_id, **vars(user)})
        db.connection.commit()
        return user

# Delete a user
def delete_user(user_id: int):
    query = """
        DELETE FROM users WHERE id = %(user_id)s
    """
    with PgDatabase() as db:
        db.cursor.execute(query, {'user_id': user_id})
        db.connection.commit()
        return True