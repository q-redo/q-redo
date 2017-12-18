import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import CodeSnipper from '../CodeSnipper/CodeSnipper';
import './QuestionForm.css';
import axios from 'axios';

class QuestionForm extends Component {
  constructor() {
    super();

    this.state = {
      text: '',
      code: '',
      category: '',
      showCode: false,
      showCategory: 'none'
    };
    this.handleQuestionChange = this.handleQuestionChange.bind(this);
    this.handleCodeChange = this.handleCodeChange.bind(this);
    this.handleCodeClick = this.handleCodeClick.bind(this);
    this.handleCategoryClick = this.handleCategoryClick.bind(this);
  }

  handleCodeChange(input) {
    this.setState({ code: input });
  }
  handleQuestionChange(input) {
    this.setState({ text: input });
  }

  handleCodeClick() {
    this.setState({ showCode: !this.state.showCode });
  }
  handleChooseCategory(select) {
    this.setState({ category: select, showCategory: 'none' });
  }
  handleCategoryClick() {
    if (this.state.showCategory === 'none') {
      this.setState({ showCategory: 'inline-block' });
    } else {
      this.setState({ showCategory: 'none' });
    }
  }
  submitQuestion() {
    let { text, code, topic } = this.state;
    axios
      .post('/api/questions', { text, code, topic })
      .then(response => console.log(response.data));
  }

  render() {
    return (
      <div className="questionForm-main-container m10 curved">
        <div className="firstQBox">
          <input
            placeholder="What's your question?"
            onChange={e => this.handleQuestionChange(e.target.value)}
            className="questionInput"
          />
          <button
            onClick={this.handleCodeClick}
            className="circle m10"
            children="C"
          />
          <button
            onClick={this.handleCategoryClick}
            className="circle m10"
            children="#"
          />
          {this.state.category}
          <div
            id="myDropdown"
            class="dropdown-content curved"
            style={{ display: `${this.state.showCategory}` }}
          >
            {/* THIS NEEDS TO CHANGE TO BEING A MAP OVER A TOPICS TABLE */}
            <a onClick={() => this.handleChooseCategory('CSS')} href="#">
              CSS
            </a>
            <a onClick={() => this.handleChooseCategory('JavaScript')} href="#">
              JavaScript
            </a>
            <a onClick={() => this.handleChooseCategory('React')} href="#">
              React
            </a>
          </div>
          {this.state.showCode ? (
            <input
              placeholder="< code_here />"
              onChange={e => this.handleCodeChange(e.target.value)}
              className="code"
            />
          ) : (
            ''
          )}
        </div>
        <div className="secondBox">
          <button
            onClick={() => this.submitQuestion()}
            className="bigCircle flexed"
          >
            ? =>
          </button>
        </div>
      </div>
    );
  }
}
export default QuestionForm;
