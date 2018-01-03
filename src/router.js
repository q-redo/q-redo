import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

//import Components to be rendered here
import StudentView from './components/StudentView';
import QuestionForm from './components/QuestionForm/QuestionForm';
import MentorCard from './components/MentorCard/MentorCard';
import MentorView from './components/MentorView/MentorView';
import QuestionTopicChart from './components/Charts/QuestionTopicChart';
import MentorQuestionCard from './components/MentorQuestionCard/MentorQuestionCard';
import QuestionThread from './components/QuestionThread/QuestionThread.js';
import QuestionArchive from './components/QuestionArchive/QuestionArchive.js';
import AdminView from './components/AdminView/AdminView'

export default (
  <BrowserRouter>
    <div>
      <Route component={StudentView} exact path="/student" />
      <Route component={MentorView} exact path="/mentorView" />
      <Route component={AdminView} exact path="/adminview" />
      <Route component={QuestionForm} exact path="/question" />
      <Route component={MentorCard} exact path="/mentorCard" />
      <Route component={MentorQuestionCard} exact path="/mentorQuestionCard" />
      <Route component={QuestionTopicChart} exact path="/topicChart" />
      <Route component={QuestionThread} path='/question/:id' />
      <Route component={QuestionArchive} path='/archive/questions' />
    </div>
  </BrowserRouter>
);
