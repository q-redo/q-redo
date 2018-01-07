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
      .post_question([
        req.body.campus_id,
        req.body.cohort_id,
        req.body.text,
        req.body.code,
        req.body.topic_id,
        req.body.user_id
      ])
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
  getArchivedQuestions: (req, res, next) => {
    const dbInstance = req.app.get('db');
    dbInstance
      .get_archived_questions()
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
  deleteQuestion: (req, res, next) => {
    const dbInstance = req.app.get('db');
    dbInstance
      .delete_question([req.params.id])
      .then(response => res.status(200).json(response))
      .catch(console.log);
  },
  answeredQuestion: (req, res, next) => {
    const dbInstance = req.app.get('db');
    dbInstance
      .put_question_answered([req.params.id])
      .then(response => res.status(200).json(response))
      .catch(console.log);
  },
  userAnsweredQuestion: (req, res, next) => {
    const dbInstance = req.app.get('db');
    dbInstance
      .put_user_answered([req.params.id])
      .then(response => res.status(200).json(response))
      .catch(console.log);
  },
  getQuestion: (req, res, next) => {
    const dbInstance = req.app.get('db');
    dbInstance
      .get_question_by_id([req.params.id])
      .then(question => res.status(200).json(question))
      .catch(console.log);
  },
  getAnswers: (req, res, next) => {
    
    console.log(1)
    const dbInstance = req.app.get('db');
    dbInstance
      .get_answers([req.params.id])
      .then(answers => res.status(200).json(answers))
      .catch(console.log);
  },

  getMentorAnswered: (req, res, next) => {
    const dbInstance = req.app.get('db');
    dbInstance
      .get_mentor_answered([req.params.id])
      .then(answers => res.status(200).json(answers))
      .catch(console.log);
  },

  updateWaitingType: (req, res, next) => {
    const dbInstance = req.app.get('db');
    dbInstance
      .put_waiting_type([req.body.val, req.params.id])
      .then(response => res.status(200).json(response))
      .catch(console.log);
  },
  getQuestion: (req, res, next) => {
    const dbInstance = req.app.get('db');
    dbInstance
      .get_question_by_id([req.params.id])
      .then(question => res.status(200).json(question))
      .catch(console.log);
  },
  downvote: (req, res, next) => {
    const dbInstance = req.app.get('db');
    dbInstance
      .downvote_answer([req.params.id])
      .then(score => res.status(200).json(score))
      .catch(console.log);
  },
  upvote: (req, res, next) => {
    const dbInstance = req.app.get('db');
    dbInstance
      .upvote_answer([req.params.id])
      .then(score => res.status(200).json(score))
      .catch(console.log);
  },
  upvote: (req, res, next) => {
    const dbInstance = req.app.get('db');
    dbInstance
      .upvote_answer([req.params.id])
      .then(score => res.status(200).json(score))
      .catch(console.log);
  },
  toggleVerify: (req, res, next) => {
    const dbInstance = req.app.get('db');
    dbInstance
      .toggle_verify([req.params.id])
      .then(response => res.status(200).json(response))
      .catch(console.log);
  },
  postAnswer: (req, res, next) => {
    const dbInstance = req.app.get('db');
    dbInstance
      .post_answer([
        req.body.answer,
        req.body.code_block,
        req.body.user_id,
        req.body.q_id
      ])
      .then(response => res.status(200).json(response))
      .catch(console.log);
  },
  getQuestionById: (req, res, next) => {
    const dbInstance = req.app.get('db');
    dbInstance
      .get_question_by_id([req.params.id])
      .then(response => res.status(200).json(response))
      .catch(console.log);
  },
  searchForStudent: (req, res, next) => {
    const dbInstance = req.app.get('db');
    const { searchText } = req.body;

    dbInstance
      .search_for_students(searchText)
      .then(response => res.status(200).send(response))
      .catch(() => res.status(500).send());
  },
  changeRank: (req, res, next) => {
    const dbInstance = req.app.get('db');
    const { user_id, rank } = req.body;

    dbInstance
      .change_user_rank(user_id, rank)
      .then(response => res.status(200).json(response))
      .catch(console.log);
  },
  getCandC: (req, res, next) => {
    const dbInstance = req.app.get('db');

    dbInstance
      .get_campus_and_cohort()
      .then(response => res.status(200).send(response))
      .catch(console.log);
  },
  changeCampus: (req, res, next) => {
    const dbInstance = req.app.get('db');
    const { user_id, campus_id } = req.body;

    dbInstance
      .change_user_campus(user_id, campus_id)
      .then(response => res.status(200).send(response))
      .catch(console.log);
  },
  changeCohort: (req, res, next) => {
    const dbInstance = req.app.get('db');
    const { user_id, cohort_id } = req.body;

    dbInstance
      .change_user_cohort(user_id, cohort_id)
      .then(response => res.status(200).send(response))
      .catch(console.log);
  },
  campusCreation: (req, res, next) => {
    const dbInstance = req.app.get('db');
    const { campus_name } = req.body;

    dbInstance
      .create_new_campus(campus_name)
      .then(response => res.status(200).send(response))
      .catch(console.log);
  },
  cohortCreation: (req, res, next) => {
    const dbInstance = req.app.get('db');
    const { campus_id, formal_name } = req.body;

    dbInstance
      .create_new_cohort(campus_id, formal_name)
      .then(response => res.status(200).send(response))
      .catch(console.log);
  },
  archiveAllQuestions: (req, res, next) => {
    const dbInstance = req.app.get('db');
    dbInstance
      .archive_questions()
      .then(response => res.status(200).send(response))
      .catch(console.log);
  },
  getSpecificQuestions: (req, res, next) => {
    const dbInstance = req.app.get('db');
    const { table_name } = req.body;

    dbInstance
      .run(`select * from ${table_name}`)
      .then(response => res.status(200).send(response))
      .catch(console.log);
  },
  getQuestionsPerCampus: (req, res, next) => {
    const dbInstance = req.app.get('db');
    dbInstance
      .get_questions_per_campus()
      .then(response => res.send(response))
      .catch(console.log);
  },
  clearHelp: (req, res, next) => {
    const dbInstance = req.app.get('db');
    dbInstance
      .clear_help([req.params.id])
      .then(response => res.status(200).json(response))
      .catch(console.log);
  },
  linkUsers: (req, res, next) => {
    const dbInstance = req.app.get('db');
    dbInstance
      .link_users([req.params.id, req.body.paired])
      .then(response => res.status(200).json(response))
      .catch(console.log);
  },
  unlinkUsers: (req, res, next) => {
    const dbInstance = req.app.get('db');
    dbInstance
      .unlink_users([req.params.id])
      .then(response => res.status(200).json(response))
      .catch(console.log);
  },
  inactiveQuestion: (req, res, next) => {
    const dbInstance = req.app.get('db');
    dbInstance
      .inactive_question([req.params.id])
      .then(response => res.status(200).json(response))
      .catch(console.log);
  },
  helpRemover: (req, res, next) => {
    const dbInstance = req.app.get('db');
    const { user_id } = req.body;

    dbInstance
      .remove_user_help(user_id)
      .then(response => res.status(200).json(response))
      .catch(console.log);
  }
};
