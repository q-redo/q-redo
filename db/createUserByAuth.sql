INSERT INTO users (auth_id, name, image_url, email, rank, campus_id, cohort_id) VALUES ($1, $2, $3, $4, 3, 4, 1);
SELECT FROM users WHERE auth_id= $1;