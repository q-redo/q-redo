import React, { Component } from 'react';
import axios from 'axios';
import './QuestionThread.css';
import ThreadAnswer from '../ThreadAnswer/ThreadAnswer';
import { connect } from 'react-redux';

class QuestionThread extends Component {
  constructor(props) {
    super(props);

    this.state = {
      question: {},
      answersList: []
    };
  }

  componentWillReceiveProps() {
    axios.get(`/api/answers/${this.props.questionId}`).then(answers => {
      this.setState({ answersList: answers.data, question: this.props.question });
    });
  }
  render() {
    const answers = this.state.answersList.map((answer, i) => {
      return (
        <ThreadAnswer question={this.state.question} answer={answer} key={i} />
      );
    });

    if (answers.length) {
      return <div className="answers-holder">
      {answers}
      </div>;
    } else {
      return '';
    }
  }
}

const mapStateToProps = state => state;
export default connect(mapStateToProps)(QuestionThread);
