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
    let paired_ids=[];
    let student_helpers = [];
    this.props.userList.forEach(student => {
      student.paired?
      paired_ids.push(student.paired)
      :'';
    })
    this.props.mentorList.forEach(student => {
      student.waiting_type === 'helping'?
      student_helpers.push(student)
      :'';
    })
    const mentors = this.props.mentorList.map((mentor, index) => {
      if(paired_ids.includes(mentor.user_id) || student_helpers.includes(mentor)){
      return (
        null
      )}else return <Avatar av_user={mentor} key={index}/>;
    });
    const helpers = student_helpers.map((student, index) => {
     return <Avatar av_user={student} key={index}/>;
    });


    return (
    <div className="userlist-main-container m10 shadowed">
    <h4 style={{margin: '5px 0 0 0', color: 'white'}}>Mentors</h4>
    {mentors[0] === null?
      <h6 style={{ color: 'white'}}>Room Is Empty</h6>
      :!mentors.length?
      <h6 style={{ color: 'white'}}>Room Is Empty</h6>:
      mentors
    }
    {helpers[0] === null?
      null
      :!helpers.length?
      null:
      <div>
      <h4 style={{margin: '5px 0 0 0', color: 'white'}}>Student Helpers</h4>
      {helpers}
      </div>
    }
    </div>
    )
  }
}

const mapStateToProps = state => state
export default connect(mapStateToProps, {})(MentorList)
