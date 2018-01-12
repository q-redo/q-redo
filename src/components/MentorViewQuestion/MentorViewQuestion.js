import React, { Component } from "react"
import hourglass from "../WaitingCard/hourglass.svg"
import Avatar from "../Avatar/Avatar"
import linked from "../Avatar/linked.svg"
import { toggleModal, setModalId, unlinkUsers } from "../../redux/reducer.js"
import { connect } from "react-redux"
import axios from "axios"
import "./MentorViewQuestion.css"

class MentorViewQuestion extends Component {
  constructor(props) {
    super(props)

    this.state = {
      id: 0,
      voted: false,
      helping: false,
      studentId: 0,
      helpingMentorPic: ""
    }
    this.setHelp = this.setHelp.bind(this)
    this.linkToStudent = this.linkToStudent.bind(this)
    this.getTimeFromQuestion = this.getTimeFromQuestion.bind(this)
  }
  getTimeFromQuestion(questionTime) {
    var past = new Date(questionTime).getTime();
    var isPast = new Date().getTime() - past;
    var inMinutes = Math.round(isPast / 1000 / 60);
    if (inMinutes > 7000) {
      inMinutes = "Super Old"
    }
    if (inMinutes > 2880) {
      inMinutes = "Very Old"
    }
    if (inMinutes % 60 === 0) {
      inMinutes = Math.round(inMinutes / 60) + "hrs"
    }
    if (inMinutes >= 60 && inMinutes % 60 < 10) {
      inMinutes = Math.round(inMinutes / 60) + "h 0" + inMinutes % 60 + "m"
    }
    if (inMinutes >= 60 && inMinutes % 60 >= 10) {
      inMinutes = Math.round(inMinutes / 60) + "h " + inMinutes % 60 + "m"
    }
    if (inMinutes < 60 && inMinutes % 60 < 10) {
      inMinutes = "0h 0" + inMinutes + "m"
    }
    if (inMinutes < 60 && inMinutes % 60 >= 10) {
      inMinutes = "0h " + inMinutes + "m"
    }
    return inMinutes
  }

  setHelp() {
    this.setState({ helping: !this.state.helping })
  }

  linkToStudent(id) {
    this.setState({ studentId: id })
    if (this.props.user.rank < 3) {
      axios
        .put(`/api/users/${id}`, { paired: this.props.user.user_id })
        .then(response => {
          return response.data
        })
    }
  }

  picSetter(id) {
    const { mentorList, userList } = this.props
    console.log(this.props)
    mentorList.forEach(
      usr =>
        usr.user_id === id
          ? this.setState({ helpingMentorPic: usr.image_url }) &
            console.log(usr.name)
          : false
    )
    userList.forEach(
      usr =>
        usr.user_id === id
          ? this.setState({ helpingMentorPic: usr.image_url }) &
            console.log(usr.name)
          : false
    )
  }

  render() {
    const { helpingMentorPic } = this.state
    const { question, index } = this.props
    return question.question === "HELP" ? (
      this.state.helping === false ? (
        <div className="user-help-card curved shadowed m10" key={index}>
          <div className="qh-avatar" style={{ width: "160px" }}>
            <Avatar
              av_user={{ name: question.name, image_url: question.image_url }}
            />
          </div>
          {question.paired > 0
            ? this.setHelp() & this.picSetter(question.paired)
            : false}
          <span style={{ display: "inline-flex" }}>
            <div className="time-elapsed">
              {this.getTimeFromQuestion(question.time)}{" "}
            </div>
            <img
              style={{ width: "25px" }}
              src={hourglass}
              alt="hourglass spinning"
            />
          </span>
          <section className="uh-right-side m10">
            <button
              className="bigCircle jump shadowed"
              onClick={() => {
                this.setHelp()
                this.linkToStudent(question.user_id)
              }}
            >
              <i className="fa fa-handshake-o" aria-hidden="true" />
            </button>
          </section>
        </div>
      ) : (
        <div className="user-help-card curved shadowed m10" key={index}>
          <div className="qh-avatar">
            <div
              className="user-waiting-avatar shadowed"
              style={{ backgroundImage: `url('${question.image_url}')` }}
            />
          </div>
          <img
            style={{ width: "200px", margin: "-20px 0 -20px 0" }}
            src={linked}
          />
          <div className="qh-avatar">
            <div
              className="user-waiting-avatar shadowed"
              style={{ backgroundImage: `url('${helpingMentorPic}')` }}
            />
          </div>
          <i
            onClick={e => {
              this.props.unlinkUsers(question.user_id)
              this.setHelp()
            }}
            className="fa fa-lg fa-times m10"
            style={{ color: "white" }}
          />
        </div>
      )
    ) : (
      <div className="user-question-card curved shadowed m10" key={index}>
        <section className="uq-left-side m10">
          <section className="uq-top-left">
            <Avatar
              av_user={{ name: question.name, image_url: question.image_url }}
            />
            <span style={{ display: "inline-flex" }}>
              <div className="time-elapsed">
                {this.getTimeFromQuestion(question.time)}{" "}
              </div>
              <img
                style={{ width: "25px" }}
                src={hourglass}
                alt="hourglass spinning"
              />
            </span>
          </section>
          <p>{question.question}</p>

          {question.code_block ? question.code_block.length > 0 ? (
            <code>
              <pre>
                <textarea
                  style={{ resize: "none", outline: "none", width: "100%" }}
                  readonly="readonly"
                  id="code-col"
                  className="code"
                >
                  {question.code_block}
                </textarea>
              </pre>
            </code>
          ) : (
            false
          ) : null}
        </section>

        <section className="uq-right-side m10">
          <button
            className="topicPill m10"
            style={{
              borderColor: `${question.color}`,
              background: `radial-gradient(at top left, ${question.color},${
                question.color
              }, black)`
            }}
            key={index}
          >
            {question.topic}
          </button>
          <button
            className="bigCircle jump shadowed"
            onClick={() => {
              this.props.toggleModal()
              this.props.setModalId(question.q_id)
              this.linkToStudent(question.user_id)
            }}
          >
            <i className="fa fa-2x fa-lightbulb-o" aria-hidden="true" />
          </button>
        </section>
      </div>
    )
  }
}

const mapStateToProps= state=> state;
export default connect(mapStateToProps, { toggleModal, setModalId, unlinkUsers })(MentorViewQuestion);
