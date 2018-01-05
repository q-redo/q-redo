import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux'
import moment from 'moment';
import Avatar from '../Avatar/Avatar'
import './MentorList.css';

class MentorList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mentorList: []
    };
  }

  //CWM get ALL active users
 

  render(props) {
    const list = this.props.mentorList.map((user, index) => {
      return (
        <Avatar av_user={user} />
      );
    });
    return (
    <div className="userlist-main-container m10 shadowed">
      <h4 style={{margin: '5px 0 0 0', color: 'white'}}>Mentors</h4>
      {this.props.mentorList.length?list:<h6 style={{ color: 'white'}}>Room Is Empty</h6>}
    </div>
    )
  }
}

const mapStateToProps = state => state
export default connect(mapStateToProps, {})(MentorList)