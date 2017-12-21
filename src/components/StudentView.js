import React, { Component } from 'react';
import UserList from './UserList';
import MentorCard from './MentorCard/MentorCard';
import RecentQuestions from './RecentQuestions/RecentQuestions';

import './StudentView.css';
import {connect} from 'react-redux';
import QuestionForm from './QuestionForm/QuestionForm';
import ActionCard from './ActionCard/ActionCard';
import WaitingCard from './WaitingCard/WaitingCard';

class StudentView extends Component {
  constructor(){
    super();

  }

  render() {
    console.log("the current user is this",this.props.user)
    return (
      <div id="StudentView">
        <section style={{display: 'inline-block'}}>
        {this.props.actionAskOrGetHelp === 'action'?
        <ActionCard/>:
        this.props.actionAskOrGetHelp === "question"?
        <QuestionForm/>:
        this.props.actionAskOrGetHelp === "waiting"?
        <WaitingCard/>:''
        }
        <RecentQuestions />
        <MentorCard />

        </section>
        <UserList />
      </div>
    );
  }
}

const mapStateToProps = state => state;
// const mapStateToProps = (state) => {
//  return {
//    actionAskOrGetHelp: actionAskOrGetHelp
//  }
// }

export default connect(mapStateToProps)(StudentView);
