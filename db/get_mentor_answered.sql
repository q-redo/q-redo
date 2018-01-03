SELECT name, user_answered FROM users WHERE user_id= $1 ;

-- SELECT CASE 
--            WHEN user_id=$1 && $2 && $3      THEN RETURN * WHERE user_id= $1, $2, $3
--            ELSE RETURN user_answered LIMIT 3
--        END 
--   FROM users
