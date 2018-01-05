import React, { Component } from 'react';
import './MentorCard.css';
import Avatar from '../Avatar/Avatar';
import travolta from './travolta.gif';
import { connect } from 'react-redux';

class MentorCard extends Component {
  render() {
    let paired_ids = [];
    this.props.userList.forEach(student => {
      student.paired ? paired_ids.push(student.paired) : '';
    });
    const mentors = this.props.mentorList.map((mentor, index) => {
      if (!paired_ids.includes(mentor.user_id)) {
        return <Avatar av_user={mentor} key={index} />;
      } else return null;
    });
    return (
      <div style={{ display: 'inline-block' }}>
        <div className="mentorCard curved m10 shadowed">
          <center>
            <h4 style={{ margin: '5px 0 0 0', color: 'white' }}>Mentors</h4>
          </center>
          <div className="mentor-holder">
            {mentors[0] === null ? (
              <div style={{ margin: 'auto' }}>
                <h4>No Mentors Available</h4>
                <img className="travolta" src={travolta} />
                <div className="hider" />
              </div>
            ) : !mentors.length ? (
              <div style={{ margin: 'auto' }}>
                <h4>No Mentors Available</h4>
                <img className="travolta" src={travolta} />
                <div className="hider" />
              </div>
            ) : (
              mentors
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state;
export default connect(mapStateToProps)(MentorCard);
