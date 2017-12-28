UPDATE users SET user_answered= score+1
WHERE id= $1;
