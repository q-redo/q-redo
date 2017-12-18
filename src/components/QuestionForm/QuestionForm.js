import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import CodeSnipper from '../CodeSnipper/CodeSnipper';
import './QuestionForm.css';
import axios from 'axios';

class QuestionForm extends Component {
  constructor(){
    super();

    this.state= {
      text: '',
      code: ''
    }
    this.handleCodeInput= this.handleCodeInput.bind(this);
    this.codify= this.codify.bind(this);
    this.submitQuestion= this.submitQuestion.bind(this);
  }

  handleCodeInput(userInput){
    this.setState({ text: userInput });
  }

  codify(){
    this.setState({ code: this.state.text, text: '' });
  }

  submitQuestion(){
    axios.post('/api/questions', { code: this.state.code }).then(response=> console.log(response.data));
  }
  render() {
    return (
      <div className="questionForm-main-container m10 curved">
          <div className="firstQBox">
              <input className="questionInput"/>           
              <input className="code"/>       
        </div>
        <div className="secondBox">
        <div className="bigCircle flexed">
        ? =>
        </div>
        </div>
      </div>
    );
  }
}
export default QuestionForm;
