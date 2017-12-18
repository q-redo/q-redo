import React, { Component } from 'react';
import axios from 'axios';
import './RecentQuestions.css';

class RecentQuestions extends Component {
  constructor() {
    super();

    this.state = {
      recentQuestionsList: []
    };
  }

  //CWM get three most recent questions
  componentWillMount() {
    axios.get('/api/recentQuestions').then(response => {
      this.setState({ recentQuestionsList: response.data });
    });
  }

  render() {
    const recentQuestions = this.state.recentQuestionsList.map(
      (question, index) => {
        return (
          <div className="user-card" key={index}>
            <p>{question.question}</p>
          </div>
        );
      }
    );
    return (
      <div>
        <h1 className="activeMentorsTitle"> 3 Most Recent Questions </h1>
        <div className="mentorCard">{recentQuestions}</div>
      </div>
    );
  }
}

export default RecentQuestions;
