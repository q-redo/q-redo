SELECT ca.campus_id, ca.name, ch.cohort_id, ch.formal_name
FROM campus ca
JOIN cohort ch ON ch.campus_id = ca.campus_id
ORDER BY ca.campus_id asc