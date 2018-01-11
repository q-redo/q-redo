import React, { Component } from "react"
import { connect } from "react-redux"
import { toggleModal, unlinkUsers } from "../../redux/reducer.js"
import axios from "axios"
import "./AnswerModal.css"
import QuestionThread from "../QuestionThread/QuestionThread"

class AnswerModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      question: {},
      answer: "",
      code: ""
    }
    this.handleAnswer = this.handleAnswer.bind(this)
    this.handleCode = this.handleCode.bind(this)
    this.submitAnswer = this.submitAnswer.bind(this)
  }

  componentDidMount() {
    const currentQuestion = this.props.questionList.filter(elem => {
      return elem.q_id === this.props.questionId
    })
    currentQuestion
      ? this.setState({
          question: currentQuestion[0],
          code: currentQuestion[0].code_block
        })
      : null
  }

  handleAnswer(input) {
    this.setState({ answer: input })
  }

  handleCode(input) {
    this.setState({ code: input })
  }

  submitAnswer() {
    axios.post("/api/answers", {
      answer: this.state.answer,
      code_block: this.state.code,
      user_id: this.props.user.user_id,
      q_id: this.props.questionId
    })
  }

  render() {
    return (
      <div className="modal-background">
        <div onClick={() => this.props.toggleModal()} className="invis-div2" />
        <section className="modals-holder">
          <div className="modal-main-container curved">
            <div className="modal-main-container-left">
              <p>{this.state.question.question}</p>
              <code>
                <pre>
                  <textarea
                    placeholder="< code_here />"
                    onChange={e => this.handleCode(e.target.value)}
                    id="code-col"
                    className="code inner-shadow"
                    value={this.state.code}
                    style={{
                      width: "100%",
                      minHeight: "150px",
                      outline: "none",
                      resize: "none"
                    }}
                  />
                </pre>
              </code>
              <input
                placeholder="Answer Here"
                type="text"
                onChange={e => this.handleAnswer(e.target.value)}
                className="questionInput inner-shadow"
              />
              <i
                onClick={() => {
                  this.props.toggleModal()
                  this.props.unlinkUsers(this.state.question.user_id)
                }}
                className="fa fa-lg fa-times"
                aria-hidden="true"
              />
            </div>
            <div className="modal-main-container-right">
              <button
                onClick={() => {
                  this.submitAnswer()
                  this.props.toggleModal()
                  this.props.unlinkUsers(this.state.question.user_id)
                }}
                className="bigCircle jump  shadowed flexed"
              >
                <i className="fa fa-lg fa-paper-plane" aria-hidden="true" />
              </button>
              <span style={{ marginTop: "10px" }}>Submit Answer</span>
            </div>
          </div>
          <QuestionThread question={this.state.question} />
        </section>
      </div>
    )
  }
}

const mapStateToProps = state => state
export default connect(mapStateToProps, { toggleModal, unlinkUsers })(
  AnswerModal
)
