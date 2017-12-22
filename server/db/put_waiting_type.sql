UPDATE users SET waiting_type=$1 ask_time=now() WHERE user_id=$2;rs
