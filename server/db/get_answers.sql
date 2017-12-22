SELECT * FROM answers
WHERE question_id=$1
ORDER BY score DESC;
