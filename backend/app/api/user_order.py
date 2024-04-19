from app.db import PgDatabase
from app.models.order import Order


def create_order(order: Order):
    main_query = """
        INSERT INTO orders (status, placed_by)
        VALUES (%(status)s, %(placed_by)s)
        RETURNING *
    """
    join_query = """
        INSERT INTO cart_items (order_id, item_id, quantity)
        VALUES (%(order_id)s, %(item_id)s, %(quantity)s)
    """
    with PgDatabase() as db:
        db.cursor.execute(main_query, vars(order))
        order_record = db.cursor.fetchone()
        if order.cart_items is not None:
            for item in order.cart_items:
                item.order_id = order_record["id"]
                db.cursor.execute(join_query, vars(item))
        db.connection.commit()
        return order_record


def get_orders(user_id: int):
    query = """
        SELECT * FROM orders WHERE placed_by = %(user_id)s
    """
    with PgDatabase() as db:
        db.cursor.execute(query, {"user_id": user_id})
        orders = db.cursor.fetchall()
        db.connection.commit()
        return orders


def get_order_by_id(user_id: int, order_id: int):
    main_query = """
        SELECT * FROM orders WHERE id = %(order_id)s AND placed_by = %(user_id)s
    """
    join_query = """
        SELECT * FROM cart_items WHERE order_id = %(order_id)s
    """
    with PgDatabase() as db:
        db.cursor.execute(main_query, {"order_id": order_id, "user_id": user_id})
        order = db.cursor.fetchone()
        if order is not None:
            db.cursor.execute(join_query, {"order_id": order_id})
            order["cart_items"] = db.cursor.fetchall()
        db.connection.commit()
        return order


def delete_order(user_id: int, order_id: int):
    main_query = """
        DELETE FROM orders WHERE id = %(order_id)s AND placed_by = %(user_id)s
    """
    with PgDatabase() as db:
        db.cursor.execute(main_query, {"order_id": order_id, "user_id": user_id})
        db.connection.commit()
        return True
