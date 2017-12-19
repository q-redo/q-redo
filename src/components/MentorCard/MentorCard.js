import React, { Component } from 'react';
import axios from 'axios';
import './MentorCard.css';

class MentorCard extends Component {
  constructor() {
    super();

    this.state = {
      mentorList: []
    };
  }

  //CWM get ALL active mentors
  componentWillMount() {
    axios.get('/api/mentors').then(response => {
      this.setState({ mentorList: response.data });
    });
  }

  render() {
    const mentors = this.state.mentorList.map((mentor, index) => {
      console.log(mentor.name)
      return (
        <div className="user-card" style={{width: '45%'}} key={index}>
        
          <div className="user-card-left">
            <div className="user-avatar" style={{backgroundImage:`url('${mentor.image_url}')`}}/>
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

export default MentorCard;
