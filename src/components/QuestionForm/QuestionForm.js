import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './QuestionForm.css';
import axios from 'axios';
import { relative } from 'path';
import {connect} from 'react-redux';
import {toggleAction,toggleQuestionWaiting} from '../../redux/reducer'
import QuestionWaitingCard from '../QuestionWaitingCard/QuestionWaitingCard';

class QuestionForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "",
      code: "",
      topic_id: 1,
      topic_name: "",
      topicList: [],
      showCode: false,
      showCategory: 'none',
      question_id: ''
    };
    this.handleQuestionChange = this.handleQuestionChange.bind(this);
    this.handleCodeChange = this.handleCodeChange.bind(this);
    this.handleCodeClick = this.handleCodeClick.bind(this);
    this.handleCategoryClick = this.handleCategoryClick.bind(this);
    this.handleChooseCategory = this.handleChooseCategory.bind(this);
    this.handleWaitingType = this.handleWaitingType.bind(this);
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
  handleWaitingType(val){
    axios.put(`/api/waiting_type/${this.props.user.user_id}`, {val}).then(response => {console.log('this is the response', response), response});
  } 
  submitQuestion() {
    let { text, code, topic_id } = this.state;
    let { user_id } = this.props.user
    axios
      .post("/api/questions", { text, code, topic_id, user_id })
      .then(response => {
        this.setState({question_id: response.data[0].q_id})
        this.props.toggleQuestionWaiting(true)});  
  }

  render() {
    const method = this.handleChooseCategory;
    const topics = this.state.topicList.map(function(thing){
      return (<a onClick={() => method(thing)} href="#">
      {thing.topic}
    </a>)
    })
  
    return (
      this.props.questionWaiting?
      <QuestionWaitingCard question_id={this.state.question_id}/>
      :
      <div className="questionForm-main-container m10 curved shadowed">
        <div className="firstQBox">
          <input
            placeholder="What's your question?"
            onChange={e => this.handleQuestionChange(e.target.value)}
            className="questionInput inner-shadow"
          />
          <button
            onClick={this.handleCodeClick}
            className="circle jump m10 shadowed"
              
          ><i style={{marginLeft: '-1px'}}className="fa fa-code"></i></button>
          <button
            onClick={this.handleCategoryClick}
            className="circle jump m10 shadowed"
            
          ><i className="fa fa-hashtag"></i></button>
          {this.state.topic_name}
          <div
            id="myDropdown"
            className="dropdown-content curved"
            style={{ display: `${this.state.showCategory}` }}
          >
            {topics}
          </div>
          <div onClick={() => this.handleCategoryClick()} className="invis-div"
            style={{ display: `${this.state.showCategory}` }}/>
          {this.state.showCode ? (
            <textarea
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
            
            style={{marginLeft: '50px'}}
            onClick={() => { this.handleWaitingType('question'), this.submitQuestion()}}
            className="bigCircle jump  shadowed flexed"
          >
            
            <i className="fa fa-lg fa-paper-plane" aria-hidden="true"></i>
          </button>
          <div style={{position: 'relative', width: '10px', height: '100px'}}>
            <i onClick={()=>this.props.toggleAction("action")} class="fa fa-lg fa-times" aria-hidden="true"></i>
          </div>  
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => state;

export default connect(mapStateToProps ,{toggleAction, toggleQuestionWaiting})(QuestionForm);