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
          <button className="topicPill curved m10" key={index}>
            {question.topic}
          </button>
        );
      }
    );
    return (
        <div style={{display: 'inline-block'}}>
        <div className="recentQuestions curved shadowed m10">
        <h4 style={{margin: '5px 0 0 0', color: 'white'}}>RECENT QQs</h4>
        {recentQuestions}
        </div>
        </div>
    );
  }
}

export default RecentQuestions;
