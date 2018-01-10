UPDATE users SET user_answered= user_answered +1
WHERE user_id= $1;
