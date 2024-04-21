CREATE OR REPLACE FUNCTION spent_order()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE users u
    SET spent = spent + (SELECT SUM(price * NEW.quantity) FROM items WHERE NEW.item_id=id)
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
    SET spent = spent + (
        SELECT COALESCE(SUM(fee), 0) FROM events e 
        WHERE NEW.event_id=e.id AND NEW.user_id=u.id
    );
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
    UPDATE items 
    SET stock = stock - NEW.quantity
    WHERE id=NEW.item_id;
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
$$ LANGUAGE PLPGSQL;

CREATE OR REPLACE TRIGGER event_last_updated_update
AFTER UPDATE ON registrations
FOR EACH ROW
EXECUTE PROCEDURE event_last_updated();

create function members_add_update()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE clubs c
    SET members = members + 1
    WHERE c.id=NEW.club_id;
    RETURN NEW;
END;
$$ LANGUAGE PLPGSQL;

CREATE TRIGGER club_members_add_update
AFTER INSERT ON public.club_members
FOR EACH ROW
EXECUTE FUNCTION members_add_update();

create function members_remove_update()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE clubs c
    SET members = members - 1
    WHERE c.id=OLD.club_id;
    RETURN NEW;
END;
$$ LANGUAGE PLPGSQL;

CREATE TRIGGER club_members_remove_update
AFTER DELETE ON public.club_members
FOR EACH ROW
EXECUTE FUNCTION members_remove_update();
