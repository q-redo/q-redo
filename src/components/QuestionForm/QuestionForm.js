import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './QuestionForm.css';
import axios from 'axios';

class QuestionForm extends Component {
  constructor() {
    super();

    this.state = {
      text: "",
      code: "",
      topic_id: 1,
      topic_name: "",
      topicList: [],
      showCode: false,
      showCategory: 'none'
    };
    this.handleQuestionChange = this.handleQuestionChange.bind(this);
    this.handleCodeChange = this.handleCodeChange.bind(this);
    this.handleCodeClick = this.handleCodeClick.bind(this);
    this.handleCategoryClick = this.handleCategoryClick.bind(this);
    this.handleChooseCategory = this.handleChooseCategory.bind(this);
  }

  componentDidMount() {
    axios
      .get('/api/topics')
      .then(response => this.setState({ topicList: response.data }));
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
    this.setState({ topic_id: select.id, topic_name: select.topic, showCategory: "none" });
  }
  handleCategoryClick() {
    if (this.state.showCategory === 'none') {
      this.setState({ showCategory: 'inline-block' });
    } else {
      this.setState({ showCategory: 'none' });
    }
  }
  submitQuestion() {
    let { text, code, topic_id } = this.state;
    axios
      .post("/api/questions", { text, code, topic_id })
      .then(response => console.log(response.data));
  }

  render() {
    console.log(this.state)
    const method = this.handleChooseCategory;
    const topics = this.state.topicList.map(function(thing){
      return (<a onClick={() => method(thing)} href="#">
      {thing.topic}
    </a>)
    })
  
    return (
      <div className="questionForm-main-container m10 curved shadowed">
        <div className="firstQBox">
          <input
            placeholder="What's your question?"
            onChange={e => this.handleQuestionChange(e.target.value)}
            className="questionInput inner-shadow"
          />
          <button
            onClick={this.handleCodeClick}
            className="circle m10"
              
          ><i style={{marginLeft: '-1px'}}className="fa fa-code"></i></button>
          <button
            onClick={this.handleCategoryClick}
            className="circle m10"
            
          ><i className="fa fa-hashtag"></i></button>
          {this.state.topic_name}
          <div
            id="myDropdown"
            className="dropdown-content curved"
            style={{ display: `${this.state.showCategory}` }}
          >
            {topics}
          </div>
          {this.state.showCode ? (
            <input
              placeholder="< code_here />"
              onChange={e => this.handleCodeChange(e.target.value)}
              className="code inner-shadow"
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
            <i className="fa fa-lg fa-paper-plane" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    );
  }
}
export default QuestionForm;
