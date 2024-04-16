from app.db import PgDatabase
from app.models.user import User

# Creates a new user
def create_user(user: User):
    query = """
        INSERT INTO users (name, phonenumber, email, from_bits, bits_id, affiliation, spent)
        VALUES (:name, :phonenumber, :email, :from_bits, :bits_id, :affiliation, :spent)
        RETURNING id
    """
    with PgDatabase() as db:
        user_id = db.execute(query, vars(user))
        db.connection.commit()
        return user_id
    
# Gets a user by their ID
def get_user_by_id(user_id: int):
    query = """
        SELECT * FROM users WHERE id = :user_id
    """
    with PgDatabase() as db:
        user = db.query_one(query, {'user_id': user_id})
        db.connection.commit()
        return user

# Update a user profile
def update_user(user_id: int, user: User):
    query = """
        UPDATE users
        SET name = :name, phonenumber = :phonenumber, email = :email, from_bits = :from_bits, bits_id = :bits_id, affiliation = :affiliation, spent = :spent
        WHERE id = :user_id
    """
    with PgDatabase() as db:
        db.execute(query, {'user_id': user_id, **vars(user)})
        db.connection.commit()
        return user