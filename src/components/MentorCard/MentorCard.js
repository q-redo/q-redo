import React, { Component } from 'react';
import axios from 'axios';
import './MentorCard.css';
import travolta from './travolta.gif';
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
        {this.state.mentorList.length?
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
