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
import MentorQuestionCard from "./MentorQuestionCard/MentorQuestionCard"
import MentorList from "./MentorList/MentorList"
import axios from "axios"
import { redirectUser, toggleAction } from "../redux/reducer"

class StudentView extends Component {
  constructor(props) {
    super(props)
    this.handleWaitingType = this.handleWaitingType.bind(this)
  }

  componentWillMount() {
    this.props.redirectUser().then(() => {
      const { user } = this.props
      setTimeout(function() {
        console.log("this ran")
        if (!user.user_id) {
          window.location.href = "/login"
        }
      }, 8000)
    })
  }
  handleWaitingType(val) {
    axios
      .put(`/api/waiting_type/${this.props.user.user_id}`, { val })
      .then(response => response)
  }

  render() {
    return (
      <div id="StudentView">
        {this.props.user ? (
          !this.props.user.name ? (
            <LoadingScreen />
          ) : (
            ""
          )
        ) : (
          false
        )}
        <section className="student-view-left">
          {this.props.user ? (
            this.props.user.waiting_type === "helping" ? (
              <div>
                <div
                  style={{
                    width: "520px",
                    height: "100px",
                    backgroundColor: "var(--main-box-color)",
                    color: "white",
                    position: "relative"
                  }}
                  className="m10 curved shadowed flexed"
                >
                  <i
                    onClick={() => {
                      this.props.toggleAction("action")
                      this.handleWaitingType("none")
                    }}
                    className="fa fa-lg fa-times m10"
                  />
                  <h3>You are offering assistance</h3>
                </div>
              </div>
            ) : null
          ) : null}
          {this.props.actionAskOrGetHelp === "action" ? (
            <ActionCard />
          ) : this.props.actionAskOrGetHelp === "question" ? (
            <QuestionForm />
          ) : this.props.actionAskOrGetHelp === "waiting" ? (
            <WaitingCard />
          ) : this.props.actionAskOrGetHelp === "helping" ? (
            <MentorQuestionCard />
          ) : null}
          {this.props.user.waiting_type === "question" ||
          this.props.user.waiting_type === "helping" ? null : (
            <RecentQuestions />
          )}
          {this.props.user.waiting_type === "helping" ||
          this.props.actionAskOrGetHelp === "question" ? null : (
            <MentorCard />
          )}
        </section>
        <div
          style={{
            display: "inline-flex",
            flexDirection: "column",
            float: "right"
          }}
        >
          <UserList />
          {this.props.user.waiting_type === "helping" ||
          this.props.user.waiting_type === "question" ? (
            <MentorList />
          ) : null}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => state
export default connect(mapStateToProps, { redirectUser, toggleAction })(
  StudentView
)
