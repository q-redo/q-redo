INSERT INTO campus (campus_name)
values ($1);
INSERT INTO cohort (formal_name, campus_id)
values ('Cohort 1', (SELECT campus_id FROM campus ORDER BY campus_id DESC LIMIT 1));