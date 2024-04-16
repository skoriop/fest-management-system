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