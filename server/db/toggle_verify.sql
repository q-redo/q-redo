UPDATE answers SET best_answer = NOT best_answer
WHERE id= $1;
