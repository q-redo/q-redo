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
    console.log(req.body.code);
    dbInstance
      .post_question([req.body.code])
      .then(question => res.status(200).json(question))
      .catch(console.log);
  },
  getActiveMentors: (req, res, next) => {
    const dbInstance = req.app.get('db');
    dbInstance
      .get_active_mentors()
      .then(mentors => res.status(200).json(mentors))
      .catch(console.log('issue with getActiveMentors'));
  },
  getRecentQuestions: (req, res, next) => {
    const dbInstance = req.app.get('db');
    dbInstance
      .get_recent_questions()
      .then(mentors => res.status(200).json(mentors))
      .catch(console.log('issue with getRecentQuestions'));
  },
  getActiveQuestions: (req, res, next) => {
    const dbInstance = req.app.get('db');
    dbInstance
      .get_active_questions()
      .then(questions => res.status(200).json(questions));
    // .catch(console.log);
  }
};
