import React, { Component } from 'react';
import Router from './router';
import TopBar from './components/TopBar/TopBar';
import Notifications from './components/Notifications/Notifications'
import {getUserList, getQuestionList, reqUser, getMentorList} from "./redux/reducer"
import {connect} from "react-redux"
import socketIOClient from 'socket.io-client'
import axios from 'axios';

import './App.css';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';

class App extends Component {
  constructor(){
    super()
    this.state = {
    response: [],
    endpoint: "127.0.0.1:3001",
    user: [],
    userList: [],
    mentorList: []
    }
    }




    componentDidMount(props) {
      const { endpoint } = this.state
      const socket = socketIOClient(endpoint)
      socket.on("FromAPI", data =>  this.props.getQuestionList(data) && this.setState({response: data}))
      socket.on("FromMe", data => this.props.reqUser(data[0]) && this.setState({user: data[0]}))
      socket.on("UserList", data => this.props.getUserList(data) && this.setState({userList: data}))
      socket.on("MentorList", data => this.props.getMentorList(data) && this.setState({mentorList: data}))
    }


  componentWillMount() {
    console.log("componentWillmount")
    axios.get('/api/me').then(response => 
      {response
  }).catch((error) => {
      error.response.data === "no_user"? window.location.href = 'http://localhost:3001/login':null;
    }
      // window.location.href = 'http://localhost:3001/login'
    )
  }

  handleLogin() {
    window.location.href = 'http://localhost:3001/login';
  }

  render() {
  
    return (

      <div  className="App flexed">
      <Notifications />
        {this.props.isLoading? <LoadingScreen/>:''}
        <TopBar/>
        <section style={{marginTop: '100px', width: '720px'}}>
        {Router}
        <button onClick={() => this.handleLogin()}>TEST AUTH0</button>
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => state
export default connect(mapStateToProps, { getUserList, getQuestionList, reqUser, getMentorList})(App)

