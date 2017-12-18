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
      return (
        <div className="user-card" key={index}>
          <p>{mentor.name}</p>
        </div>
      );
    });
    return (
      <div>
        <h1 className="activeMentorsTitle">Active Mentors here </h1>
        <div className="mentorCard">{mentors}</div>
      </div>
    );
  }
}

export default MentorCard;
