import React, { Component } from "react"
import UserList from "./UserList"
import MentorCard from "./MentorCard/MentorCard"
import RecentQuestions from "./RecentQuestions/RecentQuestions"
import "./StudentView.css"
import { connect } from "react-redux"
import QuestionForm from "./QuestionForm/QuestionForm"
import ActionCard from "./ActionCard/ActionCard"
import WaitingCard from "./WaitingCard/WaitingCard"
import LoadingScreen from "./LoadingScreen/LoadingScreen"
import axios from "axios"

class StudentView extends Component {
  constructor(props) {
    super(props)
  }


  helpRemover(){
  axios.put("/api/removequestions", {
      user_id: this.props.user.user_id
    }).then(response => response.data)
} 

  componentWillUnmount() {
    // window.removeEventListener('beforeunload', this.helpRemover);
    
  }
  componentDidMount() {
    window.addEventListener('beforeunload', this.helpRemover);
   
      }

  componentWillMount() {
    axios
      .get("/api/me")
      .then(response => {
        if (response.data.rank === 2) {
          window.location.href = "http://localhost:3000/mentorview"
        }
      })
      .catch(error => {
        error.response.data === "no_user"
          ? (window.location.href = "http://localhost:3001/login")
          : null
      })
  }

  render() {
    return (
      <div id="StudentView">
<<<<<<< HEAD
        {!this.props.user.name? <LoadingScreen />:''}
        <section className="student-view-left">
        {this.props.actionAskOrGetHelp === 'action'?
        <ActionCard/>:
        this.props.actionAskOrGetHelp === "question"?
        <QuestionForm/>:
        this.props.actionAskOrGetHelp === "waiting"?
        <WaitingCard/>:''
        }
        {this.props.user.waiting_type !== "question" ?<RecentQuestions />:''}
        <MentorCard />
=======
      <button onClick={()=> this.helpRemover()}>RULE BREAKING BUTTON</button>
        {!this.props.user.name ? <LoadingScreen /> : ""}
        <section style={{ display: "inline-block" }}>
          {this.props.actionAskOrGetHelp === "action" ? (
            <ActionCard />
          ) : this.props.actionAskOrGetHelp === "question" ? (
            <QuestionForm />
          ) : this.props.actionAskOrGetHelp === "waiting" ? (
            <WaitingCard />
          ) : (
            ""
          )}
          {this.props.user.waiting_type !== "question" ? (
            <RecentQuestions />
          ) : (
            ""
          )}
          <MentorCard />
>>>>>>> master
        </section>
        <UserList />
      </div>
    )
  }
}

const mapStateToProps = state => state
export default connect(mapStateToProps)(StudentView)
