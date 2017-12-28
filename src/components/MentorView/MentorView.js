import React, { Component } from 'react';
import MentorQuestionCard from '../MentorQuestionCard/MentorQuestionCard';
import axios from 'axios';
import UserList from '../UserList';
import MentorCard from '../MentorCard/MentorCard';
import RecentQuestions from '../RecentQuestions/RecentQuestions';
import QuestionForm from '../QuestionForm/QuestionForm';
import ActionCard from '../ActionCard/ActionCard';
import AnswerModal from '../AnswerModal/AnswerModal.js';
import { connect } from 'react-redux';
import { toggleModal } from '../../redux/reducer.js';
import './MentorView.css';

const black = {
  background: 'black',
  opacity: '0.9'
};

class MentorView extends Component {
  constructor() {
    super();

    this.state = {
      user: {}
    };
    // this.userAnsweredQuestion = this.userAnsweredQuestion.bind(this);
  }
  //
  // componentWillMount() {
  //   axios.get(
  //     `/api/users/${this.props.match.params.id}`.then(response => {
  //       this.setState({ user: response.data[0] });
  //     })
  //   );
  // }

  //
  // userAnsweredQuestion() {
  //   axios.put(`/api/userAnsweredQuestion/${id}`);
  // }
  render() {
    return (
      <div id="MentorView">
        <section style={{ display: 'inline-block' }}>
          <MentorQuestionCard />
          {this.props.isOpen === true ? (
            <div className="modal-background">
              <AnswerModal />
            </div>
          ) : null}
        </section>
        <UserList />
        <div>
          <button
            //value={users.user_answered}
            onClick={e => this.userAnsweredQuestion(e.target.value)}
          >
            I answered this
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state;
export default connect(mapStateToProps, { toggleModal })(MentorView);
