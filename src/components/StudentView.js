import React, { Component } from 'react';
import UserList from './UserList';
import CodeSnipper from './CodeSnipper/CodeSnipper.js';
import MentorCard from './MentorCard/MentorCard';
import RecentQuestions from './RecentQuestions/RecentQuestions';

import './StudentView.css';

class StudentView extends Component {
  render() {
    return (
      <div>
        <h1 className="navHere">Student View Navbar</h1>
        <MentorCard />
        <UserList />
        <RecentQuestions />
        <div>name </div>
      </div>
    );
  }
}
export default StudentView;
