SELECT name, user_answered, user_id FROM users WHERE name ~* $1 OR email ~* $1 
ORDER BY user_id DESC;

-- SELECT CASE 
--            WHEN user_id=$1 && $2 && $3      THEN RETURN * WHERE user_id= $1, $2, $3
--            ELSE RETURN user_answered LIMIT 3
--        END 
--   FROM users
--
-- SELECT 
--     CASE WHEN name IS NULL THEN 0 ELSE user_answered, name END
-- FROM users WHERE name= $1;
