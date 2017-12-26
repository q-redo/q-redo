import React, { Component } from 'react';
import axios from 'axios';
import './MentorCard.css';
import Avatar from '../Avatar/Avatar';
import travolta from './travolta.gif';
import {connect} from 'react-redux'

class MentorCard extends Component {
  constructor() {
    super();
  }

  render() {
    let paired_ids=[];
    this.props.userList.forEach(student => {
      student.paired?
      paired_ids.push(student.paired)
      :'';
    })
    const mentors = this.props.mentorList.map((mentor, index) => {
      if(!paired_ids.includes(mentor.user_id)){
      return (
        <Avatar av_user={mentor}/>
      )};
    });
    return (
        <div style={{display: 'inline-block'}}>
        <div className="mentorCard curved m10 shadowed">
        {this.props.mentorList.length?
        mentors:<div style={{margin: 'auto'}}>
          <h4 >NO MENTORS AVAILABLE</h4>
          <img className="travolta" src={travolta}/>
          <div className="hider"/>
          </div>
        }
        </div>
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
