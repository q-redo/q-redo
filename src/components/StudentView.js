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
import {redirectUser} from '../redux/reducer';

class StudentView extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.redirectUser().then(()=>{
    const {user} = this.props
      setTimeout(function(){ if(!user.user_id){ 
        window.location.href = "http://localhost:3001/login"}} , 8000)
    })

  }

  render() {
    return (
      <div id="StudentView">
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
        </section>
        <UserList />
      </div>
    )
  }
}

const mapStateToProps = state => state
export default connect(mapStateToProps, {redirectUser})(StudentView)
