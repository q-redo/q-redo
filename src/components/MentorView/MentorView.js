import React, { Component } from 'react';
//import UserList from './UserList';
import MentorQuestionCard from '../MentorQuestionCard/MentorQuestionCard';
// import RecentQuestions from './RecentQuestions/RecentQuestions';
import UserList from '../UserList';
import MentorCard from '../MentorCard/MentorCard';
import RecentQuestions from '../RecentQuestions/RecentQuestions';
import QuestionForm from '../QuestionForm/QuestionForm';
import ActionCard from '../ActionCard/ActionCard';
import './MentorView.css';

class MentorView extends Component {
  render() {
    return ( 
        <div id="MentorView">
        <section style={{display: 'inline-block'}}>
        <MentorQuestionCard/>
        </section>
        <UserList />
      </div>
    );
  }
}
export default MentorView;
