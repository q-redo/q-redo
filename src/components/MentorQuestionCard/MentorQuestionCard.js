import React, { Component } from 'react';
import axios from 'axios';
import './MentorQuestionCard.css';

class MentorQuestionCard extends Component {
  constructor() {
    super();

    this.state = {
      activeQuestionsList: []
    };
  }

  //CWM get three most recent questions
  componentWillMount() {
    axios.get('/api/activeQuestions').then(response => {
      console.log(response.data);
      this.setState({ activeQuestionsList: response.data });
    });
  }

  render() {
    const activeQuestions = this.state.activeQuestionsList.map(
      (question, index) => {
        return (
          <div className="user-question-card" key={index}>
            <div className='question-card-col'>
              <h3>{question.name}</h3>
            </div>

            <div className='question-card-col'>
              <h3>TOPIC</h3>
              <p>{question.name}</p>
            </div>

            <div className='question-card-col'>
              <h3>QUESTION</h3>
              <p>{question.question}</p>
            </div>

            <div className='question-card-col'>
              <h3>CODE</h3>
              <div>
                  <code>
                    <pre>
                      <textarea id='code-col'>
                        {question.code_block}
                      </textarea>
                    </pre>
                  </code>

              </div>
            </div>
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
