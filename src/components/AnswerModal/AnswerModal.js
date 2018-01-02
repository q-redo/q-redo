import React, { Component } from "react";
import { connect } from "react-redux";
import { toggleModal } from "../../redux/reducer.js";
import axios from "axios";
import "./AnswerModal.css";
import QuestionThread from "../QuestionThread/QuestionThread";

class AnswerModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      question: {},
      answer: "",
      code: ""
    };
    this.handleAnswer = this.handleAnswer.bind(this);
    this.handleCode = this.handleCode.bind(this);
    this.submitAnswer = this.submitAnswer.bind(this);
  }

  componentDidMount() {
    axios.get(`/api/questions/${this.props.questionId}`).then(response => {
      this.setState({
        question: response.data[0],
        code: response.data[0].code_block
      });
      console.log(this.state.question);
    });
  }
  componentWillUpdate(){
    axios.get(`/api/answers/${this.props.questionId}`).then(answers=> {
      this.setState({ answersList: answers.data });
    });
  }

  handleAnswer(input) {
    this.setState({ answer: input });
  }

  handleCode(input) {
    this.setState({ code: input });
  }

  submitAnswer() {
    axios.post("/api/answers", {
      answer: this.state.answer,
      code_block: this.state.code,
      user_id: this.props.user.user_id,
      q_id: this.props.questionId
    });
  }

  render() {
    return (
      <div className="modal-background">
        <div onClick={() => this.props.toggleModal()} className="invis-div2"/>
        <section className="modals-holder">
          <div className="modal-main-container curved">
          <div className="modal-main-container-left">
            <p>{this.state.question.question}</p>
            <input
              placeholder="< code_here />"
              onChange={e => this.handleCode(e.target.value)}
              id="code-col"
              className="code inner-shadow"
              value={this.state.code}
            />
            <input
              placeholder="Answer Here"
              type="text"
              onChange={e => this.handleAnswer(e.target.value)}
              className="questionInput inner-shadow"
            />
            <i
              onClick={() => this.props.toggleModal()}
              className="fa fa-lg fa-times"
              aria-hidden="true"
            />
            </div>
            <div className="modal-main-container-right">
            <button
              onClick={() => {
                this.submitAnswer();
                this.props.toggleModal();
              }}
              className="bigCircle jump  shadowed flexed"
            >
              <i className="fa fa-lg fa-paper-plane" aria-hidden="true" />
            </button>
            <span style={{marginTop: '10px'}}>SUBMIT ANSWER</span>
            </div>
          </div>
          <QuestionThread question={this.state.question} />
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => state;
export default connect(mapStateToProps, { toggleModal })(AnswerModal);
