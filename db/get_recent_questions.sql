SELECT * FROM questions
INNER JOIN topics ON questions.topic_id = topics.id ORDER BY q_id DESC LIMIT 3;