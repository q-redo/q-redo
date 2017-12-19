import React, { Component } from 'react';
import Moment from 'react-moment';
import axios from 'axios';
import './MentorQuestionCard.css';

class MentorQuestionCard extends Component {
  constructor() {
    super();

    this.state = {
      activeQuestionsList: [],
      answered: false
    };
  }

  //CWM get three most recent questions
  componentWillMount() {
    axios.get('/api/activeQuestions').then(response => {
      console.log(response.data);
      this.setState({ activeQuestionsList: response.data });
    });
  }
  // answeredQuestion() { ////////////////////////////////////////////////
  //   axios.post;
  // }
  render() {
    const activeQuestions = this.state.activeQuestionsList.map(
      (question, index) => {
        return (
          <div className="user-card" key={index}>
            <p>{question.question}</p>
            <p>NAME: {question.name}</p>
            <p>
              <Moment fromNow>{question.time}</Moment>
            </p>
            <div
              className="user-avatar"
              style={{ backgroundImage: `url(${question.image_url})` }}
            />
            <hr />
            <p>{question.code_block}</p>
          </div>
        );
      }
    );
    return (
      <div>
        <h1 className="activeMentorsTitle"> All Active Questions </h1>
        <div className="mentorCard">{activeQuestions}</div>
      </div>
    );
  }
}

export default MentorQuestionCard;
