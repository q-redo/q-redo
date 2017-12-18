import React, { Component } from 'react';
import axios from 'axios';
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
      this.setState({ userList: response.data });
    });
  }

  render() {
    const users = this.state.userList.map((user, index) => {
      console.log(user)
      return (
        <div className="user-card" key={index}>
        
          <div className="user-card-left">
            <div className="user-avatar" style={{backgroundPosition: 'center', backgroundSize: 'cover', backgroundImage:`url('${user.image_url}')`}}/>
          </div>

          <div className="user-card-right">
            <small>{user.name.split(' ')[0]}</small>
          </div>
        </div>
      );
    });
    return <div className="userlist-main-container m10">{users}</div>;
  }
}

export default UserList;