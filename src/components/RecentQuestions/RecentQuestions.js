import React, { Component } from 'react';
import axios from 'axios';
import './RecentQuestions.css';
import AnswerModal from '../AnswerModal/AnswerModal.js';
import { connect } from 'react-redux';
import { toggleModal, setModalId } from '../../redux/reducer.js';

class RecentQuestions extends Component {
  constructor() {
    super();

    this.state = {
      recentQuestionsList: [],
      id: 0,
      voted: false
    };
    this.answeredQuestion = this.answeredQuestion.bind(this);
  }
  //CWM get three most recent questions
  componentWillMount() {
    axios.get('/api/recentQuestions').then(response => {
      this.setState({ recentQuestionsList: response.data });
    });
  }
  answeredQuestion(id) {
    axios.put(`/api/questions/${id}`).then(response => {
      return response.data;
    });
  }

  render() {
    const recentQuestions = this.state.recentQuestionsList.map(
      (question, index) => {
        return (
          <button className="topicPill jump m10" onClick={()=> {
            this.props.toggleModal(); 
            this.props.setModalId(question.q_id);
           }} style={{borderColor:`${question.color}`, background: `radial-gradient(at top left, ${question.color},${question.color}, black)`}} key={index}>
            {question.topic}
          </button>
        );
      }
    );
    return (
        <div style={{display: 'inline-block'}}>
        <div className="recentQuestions curved shadowed m10">
        <h4 style={{margin: '5px 0 0 0', color: 'white'}}>Recent Topics</h4>
        {recentQuestions}
        { this.props.isOpen? <div className='modal-background'><AnswerModal question_id={this.state.id}/></div> :''}
        </div>
        </div>
    );
  }
}

const mapStateToProps= state=> state;
export default connect(mapStateToProps, { toggleModal, setModalId })(RecentQuestions);
