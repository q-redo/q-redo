import React, { Component } from 'react';
import axios from 'axios';
import './QuestionThread.css';

class QuestionThread extends Component {
  constructor() {
    super();

    this.state = {
      question: {},
      answersList: []
    };
    this.upvote = this.upvote.bind(this);
    this.downvote = this.downvote.bind(this);
    this.toggleVerify = this.toggleVerify.bind(this);
  }

  componentWillMount() {
    axios.get(`/api/question/${this.props.match.params.id}`).then(response => {
      // console.log(response.data[0].code_block);
      this.setState({ question: response.data[0] });
    });

    axios.get(`/api/answers/${this.props.match.params.id}`).then(answers => {
      this.setState({ answersList: answers.data });
    });
  }

  componentWillUpdate() {
    axios.get(`/api/answers/${this.props.match.params.id}`).then(answers => {
      this.setState({ answersList: answers.data });
    });
  }

  upvote(id) {
    axios.put(`/api/upvote/answers/${id}`);
  }

  downvote(id) {
    axios.put(`/api/downvote/answers/${id}`);
  }

  toggleVerify(id) {
    axios.put(`/api/verify/answers/${id}`);
  }

  render() {
    const answers = this.state.answersList.map((answer, i) => {
      return answer.best_answer === true ? (
        <div className="answer-container best-answer" key={answer.id}>
          <p>{answer.answer}</p>
          <button
            className="upvote vote-btn"
            value={answer.id}
            onClick={e => {
              this.upvote(e.target.value);
            }}
          >
            &#x21E7;
          </button>
          <button
            className="downvote vote-btn"
            value={answer.id}
            onClick={e => {
              this.downvote(e.target.value);
            }}
          >
            &#x21E9;
          </button>
          <p>SCORE: {answer.score}</p>
          <span>
            <i className="fa fa-2x fa-check" /> Verified Answer
          </span>
          <button
            value={answer.id}
            onClick={e => {
              this.toggleVerify(e.target.value);
            }}
          >
            Verified Answer
          </button>
        </div>
      ) : (
        <div className="answer-container" key={answer.id}>
          <p>{answer.answer}</p>
          <button
            className="upvote vote-btn"
            value={answer.id}
            onClick={e => {
              this.upvote(e.target.value);
            }}
          >
            &#x21E7;
          </button>
          <button
            className="downvote vote-btn"
            value={answer.id}
            onClick={e => {
              this.downvote(e.target.value);
            }}
          >
            &#x21E9;
          </button>
          <p>SCORE: {answer.score}</p>
          <button
            value={answer.id}
            onClick={e => {
              this.toggleVerify(e.target.value);
            }}
          >
            Verified Answer
          </button>
        </div>
      );
    });
    return (
      <div className="main-container">
        <div className="question-thread-container">
          <div className="question-container">
            {this.state.question.question}
            <code>
              <pre>{this.state.question.code_block}</pre>
            </code>
          </div>
          {answers}
        </div>
      </div>
    );
  }
}

export default QuestionThread;
