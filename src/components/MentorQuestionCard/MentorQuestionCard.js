import React, { Component } from 'react';
// import Moment from 'react-moment';
import axios from 'axios';
import hourglass from '../WaitingCard/hourglass.svg';
import Avatar from '../Avatar/Avatar';
import AnswerModal from '../AnswerModal/AnswerModal.js';
import { connect } from 'react-redux';
import { toggleModal, setModalId } from '../../redux/reducer.js';
import MentorViewQuestion from '../MentorViewQuestion/MentorViewQuestion.js';
import './MentorQuestionCard.css';

class MentorQuestionCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeQuestionsList: []
    };
    this.answeredQuestion = this.answeredQuestion.bind(this);
    this.userAnsweredQuestion = this.userAnsweredQuestion.bind(this);
  }

  //CWM get three most recent questions
  // componentWillMount(){
  //   axios.get('/api/activeQuestions').then(response => {
  //     this.setState({ activeQuestionsList: response.data });
  //   });
  // }

  // componentWillReceiveProps(){
  //   axios.get('/api/activeQuestions').then(response => {
  //     this.setState({ activeQuestionsList: response.data });
  //   });
  // }

  answeredQuestion(id) {
    axios.put(`/api/questions/${id}`).then(response => {
      return response.data;
    });
  }
  userAnsweredQuestion() {
    let { user_id } = this.props.user;

    axios.put(`/api/userAnsweredQuestion/${user_id}`);
    console.log('here it is', user_id);
  }

  //We used conditional rendering in the map method to render different cards depending on the type of help/question the student needs.
  render() {
    const activeQuestions = this.props.questionList.map(          
      (question, index) => {
        return <MentorViewQuestion question={question} key={index} />;
      }
    );
    return (
      <div className="questions-array">
        {activeQuestions.length ? (
          activeQuestions
        ) : (
          <div className="user-help-card curved shadowed m10">
            <h2> No Questions</h2>
          </div>
        )}
        {this.props.isOpen ? (
          <div className="modal-background">
            <AnswerModal question_id={this.state.id} />
          </div>
        ) : (
          ''
        )}
      </div>
    );
  }
}

const mapStateToProps = state => state;
export default connect(mapStateToProps, { toggleModal, setModalId })(
  MentorQuestionCard
);
