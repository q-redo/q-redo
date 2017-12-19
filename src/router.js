import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

//import Components to be rendered here
import StudentView from './components/StudentView';
import QuestionForm from './components/QuestionForm/QuestionForm';
import MentorCard from './components/MentorCard/MentorCard';
import MentorView from './components/MentorView/MentorView';
import Chart from './components/Chart';
import MentorQuestionCard from './components/MentorQuestionCard/MentorQuestionCard';

export default (
  <BrowserRouter>
    <div>
      <Route component={Chart} exact path="/chart" />

      <Route component={StudentView} exact path="/student" />
      <Route component={MentorView} exact path="/mentorView" />
      <Route component={QuestionForm} exact path="/question" />
      <Route component={MentorCard} exact path="/mentorCard" />
      <Route component={MentorQuestionCard} exact path="/mentorQuestionCard" />
    </div>
  </BrowserRouter>
);
