SELECT users.user_id, users.name, users.image_url, questions.topic, questions.question, questions.code_block FROM users
FULL JOIN questions ON users.user_id=questions.user_id WHERE answered= false;


-- SELECT * FROM questions
-- WHERE answered= false;
