SELECT * FROM answers
WHERE question_id=$1
ORDER BY score DESC;

-- SELECT x, y FROM 
-- (SELECT * FROM answers WHERE question_id=7 AND best_answer=true ORDER BY score DESC) as x,
-- (SELECT * FROM answers WHERE question_id=7 AND best_answer=false ORDER BY score DESC) as y;

