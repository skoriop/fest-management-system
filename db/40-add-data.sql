INSERT INTO vendors (name, description) VALUES ('Cafe', 'Cafe at the ground floor');
INSERT INTO vendors (name, description) VALUES ('Mess 2', 'Mess 2');
INSERT INTO vendors (name, description) VALUES ('Mess 1', 'Mess 1');
INSERT INTO vendors (name, description) VALUES ('Dominos', 'Pizza !!');
INSERT INTO vendors (name, description) VALUES ('Subway', 'Eat Fresh !!');
INSERT INTO vendors (name, description) VALUES ('Burger King', 'Have it your way !!');

INSERT INTO items (name, description, price, non_veg, stock, vendor_id) VALUES ('Cappuccino', 'Cappuccino', 50, FALSE, 100, 1);
INSERT INTO items (name, description, price, non_veg, stock, vendor_id) VALUES ('Latte', 'Latte', 40, FALSE, 100, 1);
INSERT INTO items (name, description, price, non_veg, stock, vendor_id) VALUES ('Espresso', 'Espresso', 30, FALSE, 100, 1);
INSERT INTO items (name, description, price, non_veg, stock, vendor_id) VALUES ('Masala Dosa', 'Masala Dosa', 30, FALSE, 100, 2);
INSERT INTO items (name, description, price, non_veg, stock, vendor_id) VALUES ('Idli Sambhar', 'Idli Sambhar', 20, FALSE, 100, 2);
INSERT INTO items (name, description, price, non_veg, stock, vendor_id) VALUES ('Chicken Biryani', 'Chicken Biryani', 100, TRUE, 100, 2);
INSERT INTO items (name, description, price, non_veg, stock, vendor_id) VALUES ('Chicken Keema', 'Chicken Keema', 80, TRUE, 100, 3);
INSERT INTO items (name, description, price, non_veg, stock, vendor_id) VALUES ('Chicken Curry', 'Chicken Curry', 70, TRUE, 100, 3);
INSERT INTO items (name, description, price, non_veg, stock, vendor_id) VALUES ('Mushroom Cheese Pasta', 'Mushroom Cheese Pasta', 100, FALSE, 100, 3);
INSERT INTO items (name, description, price, non_veg, stock, vendor_id) VALUES ('Veggie Delight', 'Veggie Delight', 200, FALSE, 100, 4);
INSERT INTO items (name, description, price, non_veg, stock, vendor_id) VALUES ('Paneer Tikka', 'Paneer Tikka', 250, FALSE, 100, 5);
INSERT INTO items (name, description, price, non_veg, stock, vendor_id) VALUES ('Chicken Tikka', 'Chicken Tikka', 300, TRUE, 100, 5);
INSERT INTO items (name, description, price, non_veg, stock, vendor_id) VALUES ('Whopper', 'Whopper', 150, TRUE, 100, 6);
INSERT INTO items (name, description, price, non_veg, stock, vendor_id) VALUES ('Big Mac', 'Big Mac', 120, TRUE, 100, 6);

INSERT INTO clubs (name, description) VALUES ('CRUx', 'Programming & Computing Club');
INSERT INTO clubs (name, description) VALUES ('Cypher', 'Dance Club');
INSERT INTO clubs (name, description) VALUES ('Music Club', 'Music Club');
INSERT INTO clubs (name, description) VALUES ('Comedy Club', 'Comedy Club');
INSERT INTO clubs (name, description) VALUES ('SOS', 'Society of Souls');
INSERT INTO clubs (name, description) VALUES ('E-Cell', 'Entrepreneurship Cell');

INSERT INTO users (email, name, phone_number, from_bits, bits_id, spent) VALUES ('f20220022@hyderabad.bits-pilani.ac.in', 'Karthik Prakash' , '9597735353', TRUE, '2022A7PS0022H', 0);
INSERT INTO users (email, name, phone_number, from_bits, bits_id, spent) VALUES ('f20220037@hyderabad.bits-pilani.ac.in', 'Kishan Abijay', '9597735363', TRUE, '2022A7PS0037H', 0);
INSERT INTO users (email, name, phone_number, from_bits, bits_id, spent) VALUES ('f20216969@hyderabad.bits-pilani.ac.in', 'Soumitra Shewale', '8483302444', TRUE, '2021A7PS6969H', 0);
INSERT INTO users (email, name, phone_number, from_bits, bits_id, spent) VALUES ('f20210420@hyderabad.bits-pilani.ac.in', 'Kovid Lakhera', '7342264531', TRUE, '2021A7PS0420H', 0);
INSERT INTO users (email, name, phone_number, from_bits, bits_id, spent) VALUES ('f20220010@hyderabad.bits-pilani.ac.in', 'Varun Reddy Padala' , '8330027354', TRUE, '2022A7PS0010H', 0);
INSERT INTO users (email, name, phone_number, from_bits, bits_id, spent) VALUES ('f20231234@hyderabad.bits-pilani.ac.in', 'Zeeshan Ahmed', '9876543210', TRUE, '2023A7PS1234H', 0);
INSERT INTO users (email, name, phone_number, from_bits, affiliation, spent) VALUES ('skoriop@gmail.com', 'Sai Koriopan', '9876693210', FALSE, 'Malla Reddy Engineering College', 0);
INSERT INTO users (email, name, phone_number, from_bits, affiliation, spent) VALUES ('manjustman@gmail.com', 'Manjunath', '3278834527', FALSE, 'Dulla Reddy Arts College', 0);
INSERT INTO users (email, name, phone_number, from_bits, affiliation, spent) VALUES ('jamescorden@gmail.com', 'James Corden', '3529945320', FALSE, 'The Late Late Show', 0);
INSERT INTO users (email, name, phone_number, from_bits, affiliation, spent) VALUES ('zuck@facebook.com', 'Mark Zuckerberg', '238329122', FALSE, 'Facebook', 0);
INSERT INTO users (email, name, phone_number, from_bits, affiliation, spent) VALUES ('richardstallman@gnu.org', 'Richard Stallman', '5327748261', FALSE, 'GNU', 0);

INSERT INTO club_members VALUES (1, 1);
INSERT INTO club_members VALUES (1, 2);
INSERT INTO club_members VALUES (1, 3);
INSERT INTO club_members VALUES (2, 2);
INSERT INTO club_members VALUES (2, 4);
INSERT INTO club_members VALUES (3, 3);
INSERT INTO club_members VALUES (3, 4);
INSERT INTO club_members VALUES (4, 1);
INSERT INTO club_members VALUES (4, 5);
INSERT INTO club_members VALUES (5, 3);
INSERT INTO club_members VALUES (5, 4);
INSERT INTO club_members VALUES (6, 4);

INSERT INTO events (name, description, start_time, end_time, organizer_id, fee) VALUES ('E-Cell Hackathon', 'Join our very cool hackathon powered by Artificial IntelligenceTM and Machine LearningTM', '2024-10-10 10:00:00', '2024-10-11 10:00:00', 6, 100);
INSERT INTO events (name, description, start_time, end_time, organizer_id, fee) VALUES ('cruXipher', 'A 48-hour Capture the Flag competition', '2024-10-10 00:00:00', '2024-10-12 00:00:00', 1, 0);
INSERT INTO events (name, description, start_time, end_time, organizer_id, fee) VALUES ('Dance Night', 'A night of dance and music', '2024-10-10 20:00:00', '2024-10-11 00:00:00', 2, 50);
INSERT INTO events (name, description, start_time, end_time, organizer_id, fee) VALUES ('Open Mic Night', 'So you think you''re funny?', '2024-10-11 20:00:00', '2024-10-12 00:00:00', 4, 70);
INSERT INTO events (name, description, start_time, end_time, organizer_id, fee) VALUES ('Music Night', 'A night of music and fun', '2024-10-12 20:00:00', '2024-10-13 00:00:00', 3, 90);
INSERT INTO events (name, description, start_time, end_time, organizer_id, fee) VALUES ('Battle of the Bands', 'Full music battle only', '2024-10-13 10:00:00', '2024-10-13 18:00:00', 5, 80);
INSERT INTO events (name, description, start_time, end_time, organizer_id, fee) VALUES ('Open Source Workshop', 'Learn about the power of open source', '2024-10-14 10:00:00', '2024-10-14 18:00:00', 6, 0);

INSERT INTO venues (name, capacity, type) VALUES ('F102', 100, 'Lecture Hall');
INSERT INTO venues (name, capacity, type) VALUES ('F103', 100, 'Lecture Hall');
INSERT INTO venues (name, capacity, type) VALUES ('F104', 100, 'Lecture Hall');
INSERT INTO venues (name, capacity, type) VALUES ('F105', 100, 'Lecture Hall');
INSERT INTO venues (name, capacity, type) VALUES ('F106', 100, 'Lecture Hall');
INSERT INTO venues (name, capacity, type) VALUES ('G101', 50, 'Lecture Hall');
INSERT INTO venues (name, capacity, type) VALUES ('G102', 50, 'Lecture Hall');
INSERT INTO venues (name, capacity, type) VALUES ('G103', 50, 'Lecture Hall');
INSERT INTO venues (name, capacity, type) VALUES ('G104', 50, 'Lecture Hall');
INSERT INTO venues (name, capacity, type) VALUES ('Library Lawn', 500, 'Open');
INSERT INTO venues (name, capacity, type) VALUES ('Open Air Theatre', 300, 'Open');
INSERT INTO venues (name, capacity, type) VALUES ('I110', 50, 'Lab');
INSERT INTO venues (name, capacity, type) VALUES ('I111', 50, 'Lab');
INSERT INTO venues (name, capacity, type) VALUES ('I112', 50, 'Lab');
INSERT INTO venues (name, capacity, type) VALUES ('I113', 50, 'Lab');

INSERT INTO venue_events VALUES (1, 1);
INSERT INTO venue_events VALUES (2, 1);
INSERT INTO venue_events VALUES (3, 2);
INSERT INTO venue_events VALUES (4, 2);
INSERT INTO venue_events VALUES (12, 2);
INSERT INTO venue_events VALUES (13, 2);
INSERT INTO venue_events VALUES (5, 3);
INSERT INTO venue_events VALUES (6, 3);
INSERT INTO venue_events VALUES (11, 3);
INSERT INTO venue_events VALUES (12, 3);
INSERT INTO venue_events VALUES (7, 4);
INSERT INTO venue_events VALUES (8, 4);
INSERT INTO venue_events VALUES (9, 5);
INSERT INTO venue_events VALUES (10, 5);
INSERT INTO venue_events VALUES (11, 6);
INSERT INTO venue_events VALUES (12, 6);

INSERT INTO registrations VALUES(1, 1);
INSERT INTO registrations VALUES(1, 2);
INSERT INTO registrations VALUES(1, 3);
INSERT INTO registrations VALUES(2, 2);
INSERT INTO registrations VALUES(2, 3);
INSERT INTO registrations VALUES(2, 4);
INSERT INTO registrations VALUES(3, 3);
INSERT INTO registrations VALUES(3, 4);
INSERT INTO registrations VALUES(3, 5);
INSERT INTO registrations VALUES(4, 1);
INSERT INTO registrations VALUES(4, 5);
INSERT INTO registrations VALUES(5, 3);
INSERT INTO registrations VALUES(5, 4);
INSERT INTO registrations VALUES(6, 4);
INSERT INTO registrations VALUES(6, 6);
INSERT INTO registrations VALUES(6, 7);
INSERT INTO registrations VALUES(6, 1);
INSERT INTO registrations VALUES(7, 1);
INSERT INTO registrations VALUES(7, 2);
INSERT INTO registrations VALUES(7, 3);
INSERT INTO registrations VALUES(8, 2);
INSERT INTO registrations VALUES(8, 3);
INSERT INTO registrations VALUES(8, 4);
INSERT INTO registrations VALUES(9, 3);
INSERT INTO registrations VALUES(9, 4);
INSERT INTO registrations VALUES(9, 5);
INSERT INTO registrations VALUES(10, 1);
INSERT INTO registrations VALUES(10, 5);
INSERT INTO registrations VALUES(11, 3);
INSERT INTO registrations VALUES(11, 4);

INSERT INTO orders (status, placed_by) VALUES ('Placed', 1);
INSERT INTO orders (status, placed_by) VALUES ('Placed', 1);
INSERT INTO orders (status, placed_by) VALUES ('Placed', 1);
INSERT INTO orders (status, placed_by) VALUES ('Placed', 2);
INSERT INTO orders (status, placed_by) VALUES ('Placed', 3);
INSERT INTO orders (status, placed_by) VALUES ('Placed', 4);

INSERT INTO cart_items (order_id, item_id, quantity) VALUES (1, 1, 2);
INSERT INTO cart_items (order_id, item_id, quantity) VALUES (1, 2, 1);
INSERT INTO cart_items (order_id, item_id, quantity) VALUES (2, 1, 4);
INSERT INTO cart_items (order_id, item_id, quantity) VALUES (2, 3, 1);
INSERT INTO cart_items (order_id, item_id, quantity) VALUES (3, 4, 3);
INSERT INTO cart_items (order_id, item_id, quantity) VALUES (3, 5, 1);
INSERT INTO cart_items (order_id, item_id, quantity) VALUES (4, 1, 1);
INSERT INTO cart_items (order_id, item_id, quantity) VALUES (4, 2, 5);
INSERT INTO cart_items (order_id, item_id, quantity) VALUES (5, 3, 3);
INSERT INTO cart_items (order_id, item_id, quantity) VALUES (5, 4, 1);
INSERT INTO cart_items (order_id, item_id, quantity) VALUES (5, 7, 7);