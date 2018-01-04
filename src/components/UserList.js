import React, { Component } from 'react';
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

  render(props) {
    const paired = this.props.userList.map((user, index) => {
      if(user.paired)
      return (
        <Avatar av_user={user} />
      );
    });
    const sorted_waiting = this.props.userList.filter(elem => {
      if((elem.waiting_type === 'question' && !elem.paired)|| (elem.waiting_type === 'help' && !elem.paired)){
        return true
      }
    }).sort(function(a,b){
      return (Date.parse(a.ask_time) - Date.parse(b.ask_time));
    })
    const waiting = sorted_waiting.map((user, index) => {
      return <Avatar av_user={user} />
    });
    const not_waiting = this.props.userList.map((user, index) => {
      if((user.waiting_type !== 'question'  && !user.paired) && (user.waiting_type !== 'help'  && !user.paired)){
        return <Avatar av_user={user} key={index}/>
      }
    });
    const list= paired.concat(waiting.concat(not_waiting));
    return (
    <div className="userlist-main-container m10 shadowed">
      <h4 style={{margin: '5px 0 0 0', color: 'white'}}>Students</h4>
      {this.props.userList.length?list:<h6 style={{ color: 'white'}}>Room Is Empty</h6>}
    </div>
    )
  }
}

const mapStateToProps = state => state
export default connect(mapStateToProps, {})(UserList)
