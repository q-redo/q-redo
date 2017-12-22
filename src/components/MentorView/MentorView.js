import React, { Component } from 'react';
//import UserList from './UserList';
import MentorQuestionCard from '../MentorQuestionCard/MentorQuestionCard';
// import RecentQuestions from './RecentQuestions/RecentQuestions';
import UserList from '../UserList';
import MentorCard from '../MentorCard/MentorCard';
import RecentQuestions from '../RecentQuestions/RecentQuestions';
import QuestionForm from '../QuestionForm/QuestionForm';
import ActionCard from '../ActionCard/ActionCard';
import AnswerModal from '../AnswerModal/AnswerModal.js';
import { connect } from 'react-redux';
import { toggleModal } from '../../redux/reducer.js';
import './MentorView.css';

const black= {
  background: "black",
  opacity: "0.9"
}

class MentorView extends Component {
  render() {
    return (
      <div id="MentorView">
        <section style={{display: 'inline-block'}}>
        <MentorQuestionCard/>
        { this.props.isOpen === true ? <div className='modal-background'><AnswerModal /></div> : null }
        </section>
        <UserList />
      </div>
    );
  }
}

const mapStateToProps= state=> state;
export default connect(mapStateToProps, { toggleModal })(MentorView);
