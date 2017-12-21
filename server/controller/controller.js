module.exports = {
  getActiveUsers: (req, res, next) => {
    const dbInstance = req.app.get('db');
    dbInstance
      .get_active_users()
      .then(users => res.status(200).json(users))
      .catch(console.log);
  },
  postQuestion: (req, res, next) => {
    const dbInstance = req.app.get('db');
    dbInstance
      .post_question([req.body.text, req.body.code, req.body.topic_id, req.body.user_id])
      .then(question => res.status(200).json(question))
      .catch(console.log);
  },
  getActiveMentors: (req, res, next) => {
    const dbInstance = req.app.get('db');
    dbInstance
      .get_active_mentors()
      .then(mentors => res.status(200).json(mentors))
      .catch(console.log);
  },
  getRecentQuestions: (req, res, next) => {
    const dbInstance = req.app.get('db');
    dbInstance
      .get_recent_questions()
      .then(mentors => {
        console.log(mentors);
        res.status(200).json(mentors);
      })
      .catch(console.log);
  },
  getActiveQuestions: (req, res, next) => {
    const dbInstance = req.app.get('db');
    dbInstance
      .get_active_questions()
      .then(questions => res.status(200).json(questions))
      .catch(console.log);
  },
  getTopics: (req, res, next) => {
    const dbInstance = req.app.get('db');
    dbInstance
      .get_all_topics()
      .then(questions => res.status(200).json(questions))
      .catch(console.log);
  },
  answeredQuestion: (req, res, next) => {
    const dbInstance = req.app.get('db');
    dbInstance
      .put_question_answered([req.params.id])
      .then(response => res.status(200).json(response))
      .catch(console.log);
  },
  updateWaitingType: (req, res, next) => {
    console.log(req.body.val, req.params.id)
    const dbInstance = req.app.get('db');
    dbInstance
      .put_waiting_type([req.body.val, req.params.id])
      .then(response => res.status(200).json(response))
      .catch(console.log);
  },
  getQuestion: (req, res, next)=> {
    const dbInstance= req.app.get('db');
    dbInstance.get_question_by_id([req.params.id])
    .then(question=> res.status(200).json(question))
    .catch(console.log);
  },
  getAnswers: (req, res, next)=> {
    const dbInstance= req.app.get('db');
    dbInstance.get_answers([req.params.id])
    .then(answers=> res.status(200).json(answers))
    .catch(console.log)
  },
  downvote: (req, res, next)=> {
    const dbInstance= req.app.get('db');
    dbInstance.downvote_answer([req.params.id])
    .then(score=> res.status(200).json(score))
    .catch(console.log);
  },
  upvote: (req,res,next)=>{
  const dbInstance= req.app.get('db');
  dbInstance.upvote_answer([req.params.id])
  .then(score=> res.status(200).json(score))
  .catch(console.log);
},
  toggleVerify: (req, res, next)=> {
    const dbInstance= req.app.get('db');
    dbInstance.toggle_verify([req.params.id])
    .then(response=> res.status(200).json(200))
    .catch(console.log);
  }
};
