INSERT INTO users (auth_id, name, image_url, rank) VALUES ($1, $2, $3, 3);
SELECT FROM users WHERE auth_id= $1;
