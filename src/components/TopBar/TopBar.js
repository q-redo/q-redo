import React, { Component } from 'react';
import axios from 'axios';
import './TopBar.css';

class TopBar extends Component {
  constructor() {
    super();
  }


  render() {
    return (
    <div className="topBar-main-container flexed">
    <img width='60px' src={`http://192.241.205.79/wp-content/uploads/2017/06/cropped-cropped-cropped-devmountain_logo-1-1.png`}/>
    <span children='DM9'/> <span children='DALLAS'/> <span children='LOGOUT'/>
    </div>
    )
  }
}

export default TopBar;
