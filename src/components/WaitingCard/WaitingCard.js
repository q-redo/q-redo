import React, { Component } from 'react';
import axios from 'axios';
import hourglass from './hourglass.svg';
import ellipsis from './ellipsis.svg';
import {connect} from 'react-redux';
import {toggleAction, unlinkUsers} from '../../redux/reducer';
import './WaitingCard.css';

class WaitingCard extends Component {
  constructor(props) {
    super(props);
    this.handleWaitingType= this.handleWaitingType.bind(this);
    this.handleCancelQuestion= this.handleCancelQuestion.bind(this);
    this.finishedQuestion= this.finishedQuestion.bind(this);
    this.incrementMentorScore= this.incrementMentorScore.bind(this);
  }
  handleWaitingType(val){
    axios.put(`/api/waiting_type/${this.props.user.user_id}`, {val}).then(response => response);
  }

  handleCancelQuestion(id){  
    axios.delete(`/api/questions/${id}`).then(response => {
      console.log(this.props.cancelId);
      return response;
    });
  }
  finishedQuestion(){
    axios.put(`/api/inactive/question/${this.props.cancelId}`);
  }
  incrementMentorScore(id){
    axios.put(`/api/user_answered/${id}`);
  }
  
  render() {
    return (
      <div className="waiting-card-main-container m10 flexed curved shadowed">
            <img style={{width: '90px'}} src={hourglass} alt="hourglass spinning"/>
            <div style={{width: '170px',height: '90px', display: 'inline-flex', justifyContent: 'center', alignContent: 'center', alignItems: 'center'}}>
              <span style={{fontSize: '1.5em'}}>Stand By</span>
              <img style={{width: '36px', marginBottom: '-16px'}} src={ellipsis} alt="ellipsis"/>
            </div>
            <button style={{position: 'absolute', bottom: '0', right: '0'}} className="circle m10 shadowed jump tooltip" onClick={()=> {
                  this.finishedQuestion();
                  this.props.toggleAction("action");
                  this.handleWaitingType('none');
                  this.props.user.paired?this.incrementMentorScore(this.props.user.paired):null
                  this.props.unlinkUsers(this.props.user.user_id)
                  }}><i className="fa fa-check"/>
                  <span class="tooltiptext">Question Answered!</span>
              </button>
            <i onClick={()=> {this.props.unlinkUsers(this.props.user.user_id); this.props.toggleAction("action"); this.handleWaitingType('none'); this.handleCancelQuestion(this.props.cancelId);}} className="fa fa-lg fa-times" aria-hidden="true"></i>
      </div>
    );
  }
}
const mapStateToProps = state => state;

export default connect(mapStateToProps ,{toggleAction, unlinkUsers})(WaitingCard);
