import React, { Component } from 'react';
import MentorQuestionCard from '../MentorQuestionCard/MentorQuestionCard';
import axios from 'axios';
import UserList from '../UserList';
import MentorCard from '../MentorCard/MentorCard';
import RecentQuestions from '../RecentQuestions/RecentQuestions';
import QuestionForm from '../QuestionForm/QuestionForm';
import ActionCard from '../ActionCard/ActionCard';
import './MentorView.css';

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
export default MentorView;
