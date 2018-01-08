
UPDATE users
set waiting_type = 'none'
where user_id = $1