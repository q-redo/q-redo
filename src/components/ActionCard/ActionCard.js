import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import {connect} from 'react-redux';
import {toggleAction} from '../../redux/reducer'

import './ActionCard.css';
import axios from 'axios';

class ActionCard extends Component {
  constructor(props){
    super(props);
    this.handleWaitingType= this.handleWaitingType.bind(this);
}
handleWaitingType(val){
  axios.put(`/api/waiting_type/${this.props.user.user_id}`, {val}).then(response => response);
} 
  render() {
    return (
      <div className="actionForm-main-container m10 curved shadowed flexed">
      <div className="big-circle-card">
        <button onClick={()=>this.props.toggleAction('question')} className="bigCircle  jump shadowed flexed">
          <i className="fa fa-2x fa-question"/>
        </button>
        <span style={{marginTop: '10px'}}>ASK QUESTION</span>
        </div>
        <div className="big-circle-card">
        <button className="bigCircle  jump shadowed flexed">
          <i className="fa fa-lg fa-handshake-o"/>
        </button>
        <span style={{marginTop: '10px'}}>OFFER HELP</span>
        </div>
        <div className="big-circle-card">
        <button onClick={()=>{this.props.toggleAction('waiting'); this.handleWaitingType('help')}} className="bigCircle shadowed jump flexed">
          <i className="fa fa-2x fa-exclamation"/>
        </button>
        <span style={{marginTop: '10px'}}>GET HELP</span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps ,{toggleAction})(ActionCard);
