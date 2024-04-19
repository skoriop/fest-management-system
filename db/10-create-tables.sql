CREATE TABLE IF NOT EXISTS vendors (
  id SERIAL,
  name varchar(50) NOT NULL,
  description TEXT
);

ALTER TABLE vendors ADD CONSTRAINT vendor_PK PRIMARY KEY(id);

CREATE TABLE IF NOT EXISTS items (
  id SERIAL,
  name varchar(50) NOT NULL,
  description TEXT,
  price INTEGER NOT NULL,
  non_veg boolean NOT NULL,
  stock INTEGER NOT NULL,
  vendor_id INTEGER NOT NULL
);

ALTER TABLE items ADD CONSTRAINT item_PK PRIMARY KEY(id);

CREATE TYPE ORDER_STATUS_TYPE AS ENUM ('Placed', 'Ready', 'Done');

CREATE TABLE IF NOT EXISTS orders (
  id SERIAL,
  status ORDER_STATUS_TYPE NOT NULL,
  created_at TIMESTAMPTZ default current_timestamp,
  placed_by INTEGER NOT NULL
);

ALTER TABLE orders ADD CONSTRAINT order_PK PRIMARY KEY(id);

CREATE TABLE IF NOT EXISTS cart_items (
  order_id INTEGER NOT NULL,
  item_id INTEGER NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1
);

ALTER TABLE cart_items ADD CONSTRAINT cart_items_PK PRIMARY KEY(order_id, item_id);

CREATE TABLE IF NOT EXISTS events (
    id SERIAL,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    start_time TIMESTAMPTZ NOT NULL,
    end_time TIMESTAMPTZ NOT NULL,
    duration INTERVAL NOT NULL GENERATED ALWAYS AS (END_TIME - START_TIME) STORED,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    last_updated TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fee INTEGER NOT NULL DEFAULT 0,
    registrations INTEGER NOT NULL DEFAULT 0, 
    organizer_id INTEGER NOT NULL
);

ALTER TABLE events ADD CONSTRAINT events_PK PRIMARY KEY (id);

CREATE TYPE VENUE_TYPE AS ENUM ('Lecture Hall', 'Lab', 'Open');

CREATE TABLE IF NOT EXISTS venues (
    id SERIAL,
    name VARCHAR(255) NOT NULL,
    capacity INTEGER NOT NULL,
    type VENUE_TYPE NOT NULL
);

ALTER TABLE venues ADD CONSTRAINT venues_PK PRIMARY KEY (id);

CREATE TABLE IF NOT EXISTS venue_events (
    venue_id INTEGER NOT NULL,
    event_id INTEGER NOT NULL
);

ALTER TABLE venue_events ADD CONSTRAINT venue_events_PK PRIMARY KEY (venue_id, event_id);

CREATE TABLE IF NOT EXISTS users (
  id SERIAL,
  email VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  phone_number BIGINT NOT NULL,
  from_bits BOOLEAN NOT NULL,
  bits_id VARCHAR(255),
  spent INTEGER NOT NULL DEFAULT 0,
  affiliation VARCHAR(255)
);

ALTER TABLE users ADD CONSTRAINT user_PK PRIMARY KEY(id);

CREATE TABLE IF NOT EXISTS clubs (
  id SERIAL,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  members INTEGER NOT NULL DEFAULT 0
);

ALTER TABLE clubs ADD CONSTRAINT club_PK PRIMARY KEY(id);

CREATE TABLE IF NOT EXISTS club_members (
  club_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL
);

ALTER TABLE club_members ADD CONSTRAINT club_members_PK PRIMARY KEY(club_id, user_id);

CREATE TABLE IF NOT EXISTS registrations (
  user_id INTEGER NOT NULL,
  event_id INTEGER NOT NULL
);

ALTER TABLE registrations ADD CONSTRAINT registrations_PK PRIMARY KEY(user_id, event_id);

ALTER TABLE items ADD CONSTRAINT offered_by FOREIGN KEY(vendor_id) REFERENCES vendors(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE orders ADD CONSTRAINT placed_by FOREIGN KEY(placed_by) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE cart_items ADD CONSTRAINT cart_items_orders_FK FOREIGN KEY(order_id) REFERENCES orders(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE cart_items ADD CONSTRAINT cart_items_items_FK FOREIGN KEY(item_id) REFERENCES items(id) ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE events ADD CONSTRAINT event_organizer_FK FOREIGN KEY (organizer_id) REFERENCES clubs (id);
ALTER TABLE venue_events ADD CONSTRAINT venue_id_FK FOREIGN KEY (venue_id) REFERENCES venues (id);
ALTER TABLE venue_events ADD CONSTRAINT event_id_FK FOREIGN KEY (event_id) REFERENCES events (id);

ALTER TABLE registrations ADD CONSTRAINT registrations_user_FK FOREIGN KEY(user_id) REFERENCES users(id);
ALTER TABLE registrations ADD CONSTRAINT registrations_event_FK FOREIGN KEY(event_id) REFERENCES events(id);

ALTER TABLE club_members ADD CONSTRAINT club_members_club_FK FOREIGN KEY(club_id) REFERENCES clubs(id);
ALTER TABLE club_members ADD CONSTRAINT club_members_user_FK FOREIGN KEY(user_id) REFERENCES users(id);

ALTER TABLE users ADD CONSTRAINT user_bits_id_unique UNIQUE(bits_id);
ALTER TABLE users ADD CONSTRAINT user_email_unique UNIQUE(email);
ALTER TABLE users ADD CONSTRAINT user_phone_number_unique UNIQUE(phone_number);

ALTER TABLE users ADD CONSTRAINT user_bits_id_check CHECK ((from_bits = TRUE AND bits_id IS NOT NULL) OR (from_bits = FALSE AND bits_id IS NULL));
ALTER TABLE users ADD CONSTRAINT user_affiliation_check CHECK ((from_bits = TRUE AND affiliation IS NULL) OR (from_bits = FALSE AND affiliation IS NOT NULL));