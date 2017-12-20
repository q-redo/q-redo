import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './WaitingCard.css';
import axios from 'axios';
import { relative } from 'path';
import {connect} from 'react-redux';
import {toggleAction} from '../../redux/reducer'

class WaitingCard extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className="waiting-card-main-container m10 curved shadowed">
        <div className="secondBox">
          <button
            
            style={{marginLeft: '50px'}}
            className="bigCircle animated flexed"
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

export default connect(mapStateToProps ,{toggleAction})(WaitingCard);
