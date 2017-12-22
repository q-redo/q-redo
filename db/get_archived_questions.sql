SELECT * FROM archived_questions
INNER JOIN topics ON archived_questions.topic_id = topics.id;
