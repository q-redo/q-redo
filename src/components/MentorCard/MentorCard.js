import React, { Component } from 'react';
import axios from 'axios';
import './MentorCard.css';
import {connect} from 'react-redux'

class MentorCard extends Component {
  constructor() {
    super();

    this.state = {
      mentorList: []
    };
  }

  //CWM get ALL active mentors
 

  render() {
    const mentors = this.props.mentorList.map((mentor, index) => {
      console.log(mentor.name)
      return (
        <div className="user-card" style={{width: '45%'}} key={index}>
        
          <div className="user-card-left">
            <div className="user-avatar shadowed" style={{backgroundImage:`url('${mentor.image_url}')`}}/>
          </div>

          <div className="user-card-right">
            <small>{mentor.name.split(' ')[0]}</small>
          </div>
        </div>
      );
    });
    return (
        <div style={{display: 'inline-block'}}>
        <div className="mentorCard curved m10 shadowed">
        {mentors}</div>
        </div>
    );
  }
}


const mapStateToProps = state => state;
// const mapStateToProps = (state) => {
//  return {
//    actionAskOrGetHelp: actionAskOrGetHelp
//  }
// }

export default connect(mapStateToProps)(MentorCard);
