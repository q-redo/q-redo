SELECT * FROM questions
INNER JOIN topics ON questions.topic_id = topics.id WHERE topics.id != 1 ORDER BY q_id DESC LIMIT 4 ;
