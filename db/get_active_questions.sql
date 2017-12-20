SELECT users.user_id, users.name, users.image_url, questions.question, questions.code_block, topics.topic, topics.color FROM users
FULL JOIN questions ON users.user_id=questions.user_id FULL JOIN topics ON topics.id=questions.topic_id WHERE answered= false;