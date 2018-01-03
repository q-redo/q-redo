INSERT INTO archived_questions (q_id, campus_id, cohort_id, question, code_block, answered, user_id, time, topic_id)
  SELECT q_id, campus_id, cohort_id, question, code_block, answered, user_id, time, topic_id
  FROM questions
  WHERE answered = true;
DELETE FROM questions
USING archived_questions
WHERE questions.q_id = archived_questions.q_id;