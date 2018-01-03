UPDATE questions SET answered=true WHERE q_id=$1;
SELECT * FROM questions WHERE answered = false;