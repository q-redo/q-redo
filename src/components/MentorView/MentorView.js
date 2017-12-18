import React, { Component } from 'react';
//import UserList from './UserList';
// import CodeSnipper from './CodeSnipper/CodeSnipper.js';
import MentorQuestionCard from '../MentorQuestionCard/MentorQuestionCard';
// import RecentQuestions from './RecentQuestions/RecentQuestions';

import './MentorView.css';

class MentorView extends Component {
  render() {
    return (
      <div>
        <h1 className="navHere">MentorView View Navbar</h1>

        <div>name </div>
        <MentorQuestionCard />
      </div>
    );
  }
}
export default MentorView;
