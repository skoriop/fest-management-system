from app.db import PgDatabase
from app.models.item import Item

# Creates a new item
def create_item(vendor_id: int,item: Item):
    query = """
        INSERT INTO items (name, description,price, non_veg, stock, vendor_id)
        VALUES (%(name)s, %(description)s, %(price)s, %(non_veg)s, %(stock)s, %(vendor_id)s)
        RETURNING *
    """
    with PgDatabase() as db:
        db.cursor.execute(query, {'vendor_id': vendor_id, **vars(item)})
        item_record = db.cursor.fetchone()
        db.connection.commit()
        return item_record

# Gets a item by their ID
def get_item_by_id(vendor_id: int,item_id: int):
    query = """
        SELECT * FROM items WHERE id = %(item_id)s and vendor_id = %(vendor_id)s
    """
    with PgDatabase() as db:
        db.cursor.execute(query, {'item_id': item_id,'vendor_id': vendor_id})
        item = db.cursor.fetchone()
        db.connection.commit()
        return item

# Update a item profile
def update_item(vendor_id: int,item_id: int, item: Item):
    query = """
        UPDATE items
        SET name = %(name)s, description = %(description)s, price = %(price)s, non_veg = %(non_veg)s, stock = %(stock)s
        WHERE id = %(item_id)s and vendor_id = %(vendor_id)s
        RETURNING *
    """
    with PgDatabase() as db:
        db.cursor.execute(query, {'item_id': item_id,'vendor_id': vendor_id ,**vars(item)})
        new_item = db.cursor.fetchone()
        db.connection.commit()
        return new_item

# Delete a item
def delete_item(vendor_id: int ,item_id: int):
    query = """
        DELETE FROM items WHERE id = %(item_id)s and vendor_id = %(vendor_id)s
    """
    with PgDatabase() as db:
        db.cursor.execute(query, {'item_id': item_id,'vendor_id': vendor_id})
        db.connection.commit()
        return True