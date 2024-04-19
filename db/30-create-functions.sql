CREATE OR REPLACE VIEW venue_schedule_view AS
SELECT * FROM events e 
JOIN venue_events ve ON e.id = ve.event_id;

CREATE OR REPLACE FUNCTION get_venue_schedule(venue_id INTEGER)
RETURNS SETOF venue_schedule_view AS
$$
    SELECT * FROM events e 
    JOIN venue_events ve ON e.id = ve.event_id
    WHERE ve.venue_id = venue_id 
    ORDER BY start_time;
$$ LANGUAGE SQL;


CREATE OR REPLACE FUNCTION get_club_revenue(club_id INTEGER)
RETURNS INTEGER AS $total$
DECLARE
    total INTEGER := 0;
BEGIN
    SELECT SUM(registrations * fee) INTO total FROM events e WHERE e.organizer_id = club_id;
    RETURN total;
END;
$total$ LANGUAGE PLPGSQL;

CREATE OR REPLACE FUNCTION get_vendor_sales_summary(v_id INTEGER)
RETURNS TABLE(
    item_id INTEGER,
    item_name VARCHAR(255),
    item_price INTEGER,
    quantity BIGINT,
    revenue BIGINT
) AS $$
BEGIN
    RETURN QUERY
        SELECT id AS item_id, name AS item_name, price AS item_price, SUM(ci.quantity) AS quantity, price * SUM(ci.quantity) AS revenue
        FROM items i, cart_items ci
        WHERE i.id = ci.item_id AND i.vendor_id = v_id
        GROUP BY i.id
        ORDER BY revenue DESC;
END;
$$ LANGUAGE PLPGSQL;