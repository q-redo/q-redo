INSERT INTO users (auth_id, name, image_url, email, rank) VALUES ($1, $2, $3, $4, 3);
SELECT FROM users WHERE auth_id= $1;
