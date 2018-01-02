INSERT INTO questions (campus_id, cohort_id, question,code_block,topic_id, user_id, answered, time)
VALUES($1,$2,$3,$4,$5,$6, false, now()) RETURNING q_id;
