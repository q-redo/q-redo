import React, { Component } from 'react';
// import Moment from 'react-moment';
import axios from 'axios';
import hourglass from '../WaitingCard/hourglass.svg';
import Avatar from '../Avatar/Avatar';
import AnswerModal from '../AnswerModal/AnswerModal.js';
import { connect } from 'react-redux';
import { toggleModal, setModalId } from '../../redux/reducer.js';
import MentorViewQuestion from '../MentorViewQuestion/MentorViewQuestion.js';
import linked from '../Avatar/linked.svg';
import './MentorQuestionCard.css';

class MentorQuestionCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeQuestionsList: []
    };
    this.answeredQuestion = this.answeredQuestion.bind(this);
    this.getTimeFromQuestion = this.getTimeFromQuestion.bind(this);
    this.userAnsweredQuestion = this.userAnsweredQuestion.bind(this);
  }

  //CWM get three most recent questions
  componentWillMount() {
    axios.get('/api/activeQuestions').then(response => {
      this.setState({ activeQuestionsList: response.data });
    });
  }

  componentWillReceiveProps() {
    axios.get('/api/activeQuestions').then(response => {
      this.setState({ activeQuestionsList: response.data });
    });
  }

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
  getTimeFromQuestion(question) {
    var past = new Date(question).getTime();
    var isPast = new Date().getTime() - past;
    var inMinutes = Math.round(isPast / 1000 / 60);
    if (inMinutes > 7000) {
      inMinutes = 'Super Old';
    }
    if (inMinutes > 2880) {
      inMinutes = 'Very Old';
    }
    if (inMinutes % 60 === 0) {
      inMinutes = Math.round(inMinutes / 60) + 'hrs';
    }
    if (inMinutes >= 60 && inMinutes % 60 < 10) {
      inMinutes = Math.round(inMinutes / 60) + 'h 0' + inMinutes % 60 + 'm';
    }
    if (inMinutes >= 60 && inMinutes % 60 >= 10) {
      inMinutes = Math.round(inMinutes / 60) + 'h ' + inMinutes % 60 + 'm';
    }
    if (inMinutes < 60 && inMinutes % 60 < 10) {
      inMinutes = '0h 0' + inMinutes + 'm';
    }
    if (inMinutes < 60 && inMinutes % 60 >= 10) {
      inMinutes = '0h ' + inMinutes + 'm';
    }
    return inMinutes;
  }

  //We used conditional rendering in the map method to render different cards depending on the type of help/question the student needs.
  render() {
    const activeQuestions = this.state.activeQuestionsList.map(
      (question, index) => {
        return <MentorViewQuestion question={question} index={index} />;
      }
    );
    return (
      <div className="questions-array">
        {activeQuestions}
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
