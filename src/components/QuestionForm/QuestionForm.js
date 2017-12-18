import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './QuestionForm.css';
import axios from 'axios';

class QuestionForm extends Component {
  constructor(){
    super();

    this.state= {
      text: '',
      code: ''
    }
    this.handleQuestionChange= this.handleQuestionChange.bind(this);
    this.handleCodeChange= this.handleCodeChange.bind(this);
  }

  handleCodeChange(input){
    this.setState({ code: input });
  }
  handleQuestionChange(input){
    this.setState({ text: input});
  }

  submitQuestion(){
    axios.post('/api/questions', { text: this.state.text, code: this.state.code }).then(response=> console.log(response.data));
  }

  render() {
    return (
      <div className="questionForm-main-container m10 curved">
          <div className="firstQBox">
              <input onChange={ (e)=> this.handleQuestionChange(e.target.value) } className="questionInput"/>
              <input onChange={ (e)=> this.handleCodeChange(e.target.value) } className="code"/>
        </div>
        <div className="secondBox">
        <div onClick={ ()=> this.submitQuestion() }className="bigCircle flexed">
        ? =>
        </div>
        </div>
      </div>
    );
  }
}
export default QuestionForm;
