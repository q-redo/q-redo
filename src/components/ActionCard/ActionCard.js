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
        <button onClick={()=>this.props.toggleAction('question')} className="bigCircle flexed">
        ?
        </button>
        ASK QUESTION
        </div>
        <div className="big-circle-card">
        <button className="bigCircle flexed">
        H
        </button>
        OFFER HELP
        </div>
        <div className="big-circle-card">
        <button className="bigCircle flexed">
        !
        </button>
        GET HELP
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps ,{toggleAction})(ActionCard);
