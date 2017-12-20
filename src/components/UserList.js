import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux'

import Avatar from './Avatar/Avatar'
import './UserList.css';

class UserList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userList: []
    };
  }

  //CWM get ALL active users
 

  render(props) {
  
    const users = this.props.userList.map((user, index) => {
      console.log(user)
      return (
        <Avatar user={user} />
        // <div className="user-card" key={index}>

        //   <div className="user-card-left" style={{}}>
        //     <div className="user-avatar" style={{backgroundImage:`url('${user.image_url}')`}}/>
        //   </div>

        //   <div className="user-card-right">
        //     <small>{user.name.split(' ')[0]}</small>
        //   </div>
        // </div>
      );
    });
    return (
    <div className="userlist-main-container m10 shadowed">
    <h4 style={{margin: '5px 0 0 0', color: 'white'}}>STUDENTS</h4>
    {this.props.userList.length?users:<h6 style={{ color: 'white'}}>ROOM IS EMPTY</h6>}
    </div>
    )
  }
}

const mapStateToProps = state => state
export default connect(mapStateToProps, {})(UserList)
