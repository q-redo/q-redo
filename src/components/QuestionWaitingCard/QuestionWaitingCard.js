import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './QuestionWaitingCard.css';
import axios from 'axios';
import hourglass from '../WaitingCard/hourglass.svg';
import ellipsis from '../WaitingCard/ellipsis.svg';
import QuestionThread from '../QuestionThread/QuestionThread.js';
import { relative } from 'path';
import {connect} from 'react-redux';
import {toggleAction, toggleQuestionWaiting} from '../../redux/reducer'

class QuestionWaitingCard extends Component {
  constructor(props) {
    super(props);
    
    this.state ={
      question: {}
    }

    this.handleWaitingType= this.handleWaitingType.bind(this);
    this.handleCancelQuestion= this.handleCancelQuestion.bind(this);
  }


  handleWaitingType(val){
    axios.put(`/api/waiting_type/${this.props.user.user_id}`, {val}).then(response => response);
  } 
  handleCancelQuestion(id){  
    axios.delete(`/api/questions/${id}`).then(response => response);
  }
  getQuestion(id){
  return axios.get(`api/questions/${id}`)
}

  componentDidMount(){
    this.getQuestion(this.props.question_id).then(response => this.setState({question: response.data[0]}))
}
  render() {
    return (
      <div>
      <div className="waiting-card-main-container m10 flexed curved shadowed">
            <img style={{width: '90px'}} src={hourglass} alt="hourglass spinning"/>
            <div style={{width: '240px',height: '90px', display: 'inline-flex', justifyContent: 'center', alignContent: 'center', alignItems: 'center'}}>
            <span style={{fontSize: '1.3em'}}>Posted and waiting</span>
            <img style={{width: '36px', marginBottom: '-16px'}} src={ellipsis} alt="ellipsis"/>
            </div>
            <i onClick={()=> {this.props.toggleAction("action"); this.props.toggleQuestionWaiting(false); this.handleWaitingType('none'); this.handleCancelQuestion(this.props.question_id)}} class="fa fa-lg fa-times" aria-hidden="true"/>
      </div>
          {/* <div className="modal-main-container curved">
          <div className="modal-main-container-left">
              <input
                placeholder={this.state.question.question}
                type="text"
                onChange={e => this.handleAnswer(e.target.value)}
                className="questionInput inner-shadow"
              />
            <code>
            <pre>
            <textarea
              placeholder={this.state.question.code_block}
              onChange={e => this.handleCode(e.target.value)}
              id="code-col"
              className="code inner-shadow"
              value={this.state.code}
            />
            </pre>
            </code>
            <i
              className="fa fa-lg fa-times"
              aria-hidden="true"
            />
            </div>
          </div> */}
      <div className="question-waiting-question m10 flexed curved shadowed">
      <h3>Your Question:</h3>
      <p> {this.state.question.question}</p>
      <code className="code curved m10" style={{overflow: 'scroll', maxWidth: '450px', minWidth: '250px', padding: '0 10px 0 10px'}}>
            <pre>
         {this.state.question.code_block}
         </pre>
         </code>
      <hr style={{width: '90%'}}/>
      <p>Answers will appear below</p>
      </div>   
    <QuestionThread question={this.state.question} />

    </div>
    );
  }
}
const mapStateToProps = state => state;

export default connect(mapStateToProps ,{toggleAction, toggleQuestionWaiting})(QuestionWaitingCard);
