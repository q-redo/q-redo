import React, { Component } from 'react';
//import UserList from './UserList';
import MentorQuestionCard from '../MentorQuestionCard/MentorQuestionCard';
// import RecentQuestions from './RecentQuestions/RecentQuestions';

import './MentorView.css';

class MentorView extends Component {
  render() {
    return (
      <div>
        <h1 className="navHere">MentorView View Navbar</h1>
        <MentorQuestionCard />
      </div>
    );
  }
}
export default MentorView;
