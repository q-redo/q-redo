import React, { Component } from "react";
import Router from "./router";
import TopBar from "./components/TopBar/TopBar";
import Notifications from "./components/Notifications/Notifications";
import axios from "axios";
import {
  getUserList,
  getQuestionList,
  reqUser,
  getMentorList
} from "./redux/reducer";
import { connect } from "react-redux";
import socketIOClient from "socket.io-client";

import "./App.css";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";

class App extends Component {
  constructor() {
    super();
    this.state = {
      response: [],
      endpoint: "127.0.0.1:3001",
      user: [],
      userList: [],
      mentorList: [],
      currentTime: ""
    };
  }

  componentDidMount(props) {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on(
      "FromAPI",
      data =>
        this.props.getQuestionList(data) && this.setState({ response: data })
    );
    socket.on(
      "FromMe",
      data => this.props.reqUser(data[0]) && this.setState({ user: data[0] })
    );
    socket.on(
      "UserList",
      data => this.props.getUserList(data) && this.setState({ userList: data })
    );
    socket.on(
      "MentorList",
      data =>
        this.props.getMentorList(data) && this.setState({ mentorList: data })
    );
    socket.on(
      "The Time", data=> this.setState({currentTime: data})
    )
  }

  componentWillMount() {
    console.log("componentWillmount");
    axios
      .get("/api/me")
      .then(response => {
        response;
      })
      .catch(
        error => {
          error.response.data === "no_user"
            ? (window.location.href = "http://localhost:3001/login")
            : null;
        }
        // window.location.href = 'http://localhost:3001/login'
      );
  }

  handleLogin() {
    window.location.href = "http://localhost:3001/login";
  }

  render() {
    const styles = {
      //getting these from the reducer state
      "--main-blue-color": `${this.props.mainBlueColor}`,
      "--main-bg-color": `${this.props.mainBgColor}`,
      "--main-box-color": `${this.props.mainBoxColor}`,
      "background-color": "var(--main-bg-color)"
    };
    return (
      <div style={styles} className="App flexed">
        <div className="background" style={styles}></div>
        <Notifications />
        {this.props.isLoading ? <LoadingScreen /> : ""}
        <TopBar />

        <section style={{ marginTop: "100px", width: "720px" }}>
          {Router}
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => state;
export default connect(mapStateToProps, {
  getUserList,
  getQuestionList,
  reqUser,
  getMentorList
})(App);
