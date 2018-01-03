import React, { Component } from 'react';
import UserList from './UserList';
import MentorCard from './MentorCard/MentorCard';
import RecentQuestions from './RecentQuestions/RecentQuestions';
import './StudentView.css';
import {connect} from 'react-redux';
import QuestionForm from './QuestionForm/QuestionForm';
import ActionCard from './ActionCard/ActionCard';
import WaitingCard from './WaitingCard/WaitingCard';
import LoadingScreen from './LoadingScreen/LoadingScreen';


class StudentView extends Component {
  render() {
    return (
      <div id="StudentView">
        {!this.props.user.name? <LoadingScreen />:''}
        <section style={{display: 'inline-block'}}>
        {this.props.actionAskOrGetHelp === 'action'?
        <ActionCard/>:
        this.props.actionAskOrGetHelp === "question"?
        <QuestionForm/>:
        this.props.actionAskOrGetHelp === "waiting"?
        <WaitingCard/>:''
        }
        {this.props.user.waiting_type !== "question" ?<RecentQuestions />:''}
        <MentorCard />
        </section>
        <UserList />
      </div>
    );
  }
}

const mapStateToProps = state => state;
export default connect(mapStateToProps)(StudentView);
