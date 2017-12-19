import React, { Component } from 'react';
import UserList from './UserList';
import MentorCard from './MentorCard/MentorCard';
import RecentQuestions from './RecentQuestions/RecentQuestions';

import './StudentView.css';
import QuestionForm from './QuestionForm/QuestionForm';

class StudentView extends Component {
  render() {
    return (
      <div id="StudentView">
        <section style={{ display: 'inline-block' }}>
          <QuestionForm />
        </section>
        <UserList />
      </div>
    );
  }
}
export default StudentView;
