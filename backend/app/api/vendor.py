from app.db import PgDatabase
from app.models.vendor import Vendor


def create_vendor(vendor: Vendor):
    query = """
        INSERT INTO vendors (name, description)
        VALUES (%(name)s, %(description)s)
        RETURNING *
    """
    with PgDatabase() as db:
        db.cursor.execute(query, vars(vendor))
        vendor_record = db.cursor.fetchone()
        db.connection.commit()
        return vendor_record


def get_vendor_by_id(vendor_id: int):
    query = """
        SELECT * FROM vendors WHERE id = %(vendor_id)s
    """
    with PgDatabase() as db:
        db.cursor.execute(query, {"vendor_id": vendor_id})
        vendor = db.cursor.fetchone()
        db.connection.commit()
        return vendor


def update_vendor(vendor_id: int, vendor: Vendor):
    query = """
        UPDATE vendors
        SET name = %(name)s, description = %(description)s
        WHERE id = %(vendor_id)s
        RETURNING *
    """
    with PgDatabase() as db:
        db.cursor.execute(query, {"vendor_id": vendor_id, **vars(vendor)})
        new_vendor = db.cursor.fetchone()
        db.connection.commit()
        return new_vendor


def delete_vendor(vendor_id: int):
    query = """
        DELETE FROM vendors WHERE id = %(vendor_id)s
    """
    with PgDatabase() as db:
        db.cursor.execute(query, {"vendor_id": vendor_id})
        db.connection.commit()
        return True


def get_all_vendors():
    query = """
        SELECT * FROM vendors
    """
    with PgDatabase() as db:
        db.cursor.execute(query)
        vendors = db.cursor.fetchall()
        return vendors


def get_vendor_sales(vendor_id: int):
    query = """
        SELECT get_vendor_sales_summary(%(vendor_id)s)
    """
    with PgDatabase() as db:
        db.cursor.execute(query, {"vendor_id": vendor_id})
        sales = db.cursor.fetchall()
        return sales
