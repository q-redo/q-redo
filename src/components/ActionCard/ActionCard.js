import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import {connect} from 'react-redux';
import {toggleAction} from '../../redux/reducer'

import './ActionCard.css';
import axios from 'axios';

class ActionCard extends Component {
  constructor(props){
    super(props);

  }

  render() {
    return (
      <div className="actionForm-main-container m10 curved shadowed flexed">
      <div className="big-circle-card">
        <button onClick={()=>this.props.toggleAction('question')} className="bigCircle animated  shadowed flexed">
          <i className="fa fa-2x fa-question"></i>
        </button>
        <span style={{marginTop: '10px'}}>ASK QUESTION</span>
        </div>
        <div className="big-circle-card">
        <button className="bigCircle animated  shadowed flexed">
          <i className="fa fa-lg fa-handshake-o"></i>
        </button>
        <span style={{marginTop: '10px'}}>OFFER HELP</span>
        </div>
        <div className="big-circle-card">
        <button onClick={()=>this.props.toggleAction('waiting')} className="bigCircle shadowed animated flexed">
          <i className="fa fa-2x fa-exclamation"></i>
        </button>
        <span style={{marginTop: '10px'}}>GET HELP</span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps ,{toggleAction})(ActionCard);
