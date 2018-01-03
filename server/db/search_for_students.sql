SELECT us.user_id, us.name, us.rank, us.logged_in, us.image_url, us.auth_id, us.email, ca.campus_id, ca.campus_name, co.cohort_id, co.formal_name
FROM users us
JOIN campus ca ON us.campus_id = ca.campus_id
JOIN cohort co ON co.cohort_id = us.cohort_id
 WHERE us.name ~* $1 or us.email ~* $1