import React, { Component } from 'react';
import './StudentView.css';

class StudentView extends Component {
  //      constructor() {
  //     super();

  //     this.state = {
  //       user: ''
  //     };
  //     this.getUser = this.getUser.bind(this);
  //   }

  //   getUser(username, password) {
  //     axios.post('/user', {
  //       username: this.state.username,
  //       password: this.state.password
  //     });
  //   }
  //   render() {
  //     <button
  //       className="loginButton"
  //       onClick={() => {
  //         this.createUser(this.state.username, this.state.password);
  //       }}
  //     />;
  render() {
    return (
      <div>
        <div>
          <div>
            <h1>Student View</h1>
          </div>
        </div>
      </div>
    );
  }
}
export default StudentView;
