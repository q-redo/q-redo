UPDATE users SET waiting_type=$1, ask_time=now() AT TIME ZONE 'UTC' WHERE user_id=$2;
