import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './QuestionWaitingCard.css';
import axios from 'axios';
import hourglass from '../WaitingCard/hourglass.svg';
import ellipsis from '../WaitingCard/ellipsis.svg';
import { relative } from 'path';
import {connect} from 'react-redux';
import {toggleAction} from '../../redux/reducer'

class QuestionWaitingCard extends Component {
  constructor(props) {
    super(props);

    this.handleWaitingType= this.handleWaitingType.bind(this);
  }


  handleWaitingType(val){
    axios.put(`/api/waiting_type/${this.props.user.user_id}`, {val}).then(response => response);
  } 
  handleCancelQuestion(id){  
    axios.delete(`/api/questions/${id}`).then(response => response);
  }

  render() {
    return (
      <div className="waiting-card-main-container m10 flexed curved shadowed">
            <img style={{width: '90px'}} src={hourglass} alt="hourglass spinning"/>
            <div style={{width: '170px',height: '90px', display: 'inline-flex', justifyContent: 'center', alignContent: 'center', alignItems: 'center'}}>
            <span style={{fontSize: '1.5em'}}>STAND BY</span>
            <img style={{width: '36px', marginBottom: '-16px'}} src={ellipsis} alt="ellipsis"/>
            </div>
            <i onClick={()=> {this.props.toggleAction("action");this.props.toggleQuestionWaiting(true); this.handleWaitingType('none');this.handleCancelQuestion(this.props.question_id)}} class="fa fa-lg fa-times" aria-hidden="true"></i>
      </div>
    );
  }
}
const mapStateToProps = state => state;

export default connect(mapStateToProps ,{toggleAction})(QuestionWaitingCard);
