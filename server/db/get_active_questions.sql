SELECT users.user_id, users.name, users.image_url, users.paired, questions.question, questions.code_block, topics.topic, topics.color, questions.q_id FROM users
FULL JOIN questions ON users.user_id=questions.user_id FULL JOIN topics ON topics.id=questions.topic_id WHERE answered= false ORDER BY questions.q_id DESC;

