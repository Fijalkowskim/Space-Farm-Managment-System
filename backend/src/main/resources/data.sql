-- Sample data for the 'station' table
INSERT INTO station (id) VALUES (1), (2), (3);

-- Sample data for the 'cultivation_type' table
INSERT INTO cultivation_type (name) VALUES ('Type A'), ('Type B');

-- Sample data for the 'person' table
INSERT INTO person (login, name, password, role, surname)
VALUES
    ('john_doe', 'John', 'password1', 1, 'Doe'),
    ('alice_smith', 'Alice', 'password2', 2, 'Smith'),
    ('bob_johnson', 'Bob', 'password3', 1, 'Johnson');


-- Sample data for the 'stage_type' table
INSERT INTO stage_type (name) VALUES ('Type X'), ('Type Y'), ('Type Z');

-- Sample data for the 'measure_unit' table
INSERT INTO measure_unit (name) VALUES ('Kilogram'), ('Gram'), ('Liter');

-- Sample data for the 'cultivation' table
INSERT INTO cultivation (area, comment, planned_finish_date, real_finish_date, start_date, type_id)
VALUES (10.5, 'First cultivation', '2023-01-01 08:00:00', '2023-01-20 08:00:00', '2023-01-01 08:00:00', 1),
       (8.2, 'Second cultivation', '2023-02-01 08:00:00', NULL, '2023-02-01 08:00:00', 2);

-- Sample data for the 'cultivation_stations' table
INSERT INTO cultivation_stations (cultivation_id, station_id) VALUES (1, 1), (1, 2), (2, 3);

-- Sample data for the 'cultivation_responsible_workers' table
INSERT INTO cultivation_responsible_workers (cultivation_id, worker_id) VALUES (1, 1), (1, 2), (2, 3);

-- Sample data for the 'plant' table
INSERT INTO plant (name) VALUES ('Plant A'), ('Plant B'), ('Plant C');

-- Sample data for the 'stage' table
INSERT INTO stage (comment, finish_stage_date, start_stage_date, cultivation_id, type_id)
VALUES ('Stage 1', '2023-01-10 08:00:00', '2023-01-01 08:00:00', 1, 1),
       ('Stage 2', '2023-01-20 08:00:00', '2023-01-10 08:00:00', 1, 2),
       ('Stage 3', NULL, '2023-01-20 08:00:00', 1, 3);

-- Sample data for the 'control' table
INSERT INTO control (control_date, dead_seedlings, stage_id)
VALUES ('2023-01-15 08:00:00', 5, 1),
       ('2023-01-20 08:00:00', 3, 2),
       ('2023-01-25 08:00:00', 7, 3);

-- Sample data for the 'reading' table
INSERT INTO reading (value, control_id) VALUES (10, 1), (15, 2), (20, 3);

-- Sample data for the 'harvest' table
INSERT INTO harvest (comment, harvest_date, successful_harvest, cultivation_id)
VALUES ('First harvest', '2023-01-25 08:00:00', 1, 1), ('Second harvest', '2023-02-10 08:00:00', 0, 2);

-- Sample data for the 'measured_value' table
INSERT INTO measured_value (name, unit_id, reading_id) VALUES ('Measurement 1', 1, 1), ('Measurement 2', 2, 2), ('Measurement 3', 3, 3);
