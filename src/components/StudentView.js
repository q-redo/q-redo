import React, { Component } from 'react';
import UserList from './UserList';
import './StudentView.css';

class StudentView extends Component {
  render() {
    return (
      <div>
        <h1>Student View</h1>
        <UserList />
      </div>
    );
  }
}
export default StudentView;
