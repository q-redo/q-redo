INSERT INTO questions (question,code_block,topic_id, user_id, answered, time)
VALUES($1,$2,$3,$4, false, now()) RETURNING q_id;
