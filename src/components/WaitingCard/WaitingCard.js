import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './WaitingCard.css';
import axios from 'axios';
import hourglass from './hourglass.svg';
import ellipsis from './ellipsis.svg';
import { relative } from 'path';
import {connect} from 'react-redux';
import {toggleAction} from '../../redux/reducer'

class WaitingCard extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className="waiting-card-main-container m10 flexed curved shadowed">
            <img style={{width: '90px'}} src={hourglass} alt="hourglass spinning"/>
            <div style={{width: '170px',height: '90px', display: 'inline-flex', justifyContent: 'center', alignContent: 'center', alignItems: 'center'}}>
            <span style={{fontSize: '1.5em'}}>STAND BY</span>
            <img style={{width: '36px', marginBottom: '-16px'}} src={ellipsis} alt="ellipsis"/>
            </div>
            <i onClick={()=>this.props.toggleAction("action")} class="fa fa-lg fa-times" aria-hidden="true"></i>
      </div>
    );
  }
}
const mapStateToProps = state => state;

export default connect(mapStateToProps ,{toggleAction})(WaitingCard);
