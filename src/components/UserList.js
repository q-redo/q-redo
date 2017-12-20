import React, { Component } from 'react';
import axios from 'axios';

import Avatar from './Avatar/Avatar'
import './UserList.css';

class UserList extends Component {
  constructor() {
    super();

    this.state = {
      userList: []
    };
  }

  //CWM get ALL active users
  componentWillMount() {
    axios.get('/api/users').then(response => {
      console.log(response.data);
      this.setState({ userList: response.data });
    });
  }

  render() {
    console.log('userlist', this.state.userList)
    const users = this.state.userList.map((user, index) => {
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
    return <div className="userlist-main-container m10 shadowed">
    <h4 style={{margin: '5px 0 0 0', color: 'white'}}>STUDENTS</h4>
    {this.state.userList.length?users:<h6 style={{ color: 'white'}}>ROOM IS EMPTY</h6>}
    </div>;
  }
}

export default UserList;
