CREATE OR REPLACE FUNCTION spent_order()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE users u
    SET spent = spent + (SELECT SUM(price * quantity) FROM items WHERE NEW.item_id=id)
    WHERE EXISTS (SELECT * FROM orders o WHERE o.id=NEW.order_id AND u.id=o.placed_by);
    
    RETURN NEW;
END;
$$ LANGUAGE PLPGSQL;

CREATE OR REPLACE TRIGGER spent_order_update
AFTER INSERT ON cart_items
FOR EACH ROW
EXECUTE PROCEDURE spent_order();

CREATE OR REPLACE FUNCTION spent_events()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE users u
    SET spent = spent + (SELECT fee FROM events WHERE NEW.event_id=id AND NEW.user_id=u.id);
    RETURN NEW;
END;
$$ LANGUAGE PLPGSQL;

CREATE OR REPLACE TRIGGER spent_events_update
AFTER INSERT ON registrations
FOR EACH ROW
EXECUTE PROCEDURE spent_events();

CREATE OR REPLACE FUNCTION stock()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE items i
    SET i.stock = i.stock - NEW.quantity
    WHERE i.id=NEW.item_id;
    RETURN NEW;
END;
$$ LANGUAGE PLPGSQL;

CREATE OR REPLACE TRIGGER stock_update
AFTER INSERT ON cart_items
FOR EACH ROW
EXECUTE PROCEDURE stock();

CREATE OR REPLACE FUNCTION registered_update()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE events e
    SET registrations = registrations + 1
    WHERE e.id=NEW.event_id;
    RETURN NEW;
END;
$$ LANGUAGE PLPGSQL;

CREATE OR REPLACE TRIGGER event_register_update
AFTER INSERT ON registrations
FOR EACH ROW
EXECUTE PROCEDURE registered_update();

CREATE OR REPLACE FUNCTION event_last_updated()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE events e
    SET last_updated = CURRENT_TIMESTAMP
    WHERE e.id=NEW.event_id;
    RETURN NEW;
END;

CREATE OR REPLACE TRIGGER event_last_updated_update
AFTER UPDATE ON registrations
FOR EACH ROW
EXECUTE PROCEDURE event_last_updated();
