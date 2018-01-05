import React, { Component } from 'react';
import {connect} from 'react-redux'
import hourglass from '../WaitingCard/hourglass.svg';
import ellipsis from '../WaitingCard/ellipsis.svg';
import './LoadingScreen.css';

class LoadingScreen extends Component {
  render() {
      return (
    <div className="LoadingScreen">
    <img style={{width: '90px'}} src={hourglass} alt="hourglass spinning"/> <h1>Loading</h1>
    <img style={{width: '36px', marginBottom: '-16px'}} src={ellipsis} alt="ellipsis"/>
    </div>
      )
  }
}


const mapStateToProps = state => state;

export default connect(mapStateToProps)(LoadingScreen);