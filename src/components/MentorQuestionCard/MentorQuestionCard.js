import React, { Component } from 'react';
// import Moment from 'react-moment'; 
import axios from 'axios';
import hourglass from '../WaitingCard/hourglass.svg'
import Avatar from '../Avatar/Avatar'
import AnswerModal from '../AnswerModal/AnswerModal.js';
import { connect } from 'react-redux';
import { toggleModal, setModalId } from '../../redux/reducer.js';
import './MentorQuestionCard.css';

class MentorQuestionCard extends Component {
  constructor() {
    super();

    this.state = {
      activeQuestionsList: [],
      id: 0,
      voted: false
    };
    this.answeredQuestion = this.answeredQuestion.bind(this);
  }

  //CWM get three most recent questions
  componentWillMount() {
    axios.get('/api/activeQuestions').then(response => {
      console.log(response.data);
      this.setState({ activeQuestionsList: response.data });
    });
  }

  answeredQuestion(id) {
    axios.put(`/api/questions/${id}`).then(response => {
      return response.data;
    });
  }

  render() {
    const activeQuestions = this.state.activeQuestionsList.map(
      (question, index) => {
        return (
          <div className="user-question-card curved shadowed m10" key={index}>
            <section className="uq-left-side m10">
              <section className="uq-top-left">
              <Avatar av_user={{name: question.name, image_url: question.image_url}}/>
              <span style={{display: 'inline-block'}}>0:00 <img style={{width: '25px'}} src={hourglass} alt="hourglass spinning"/></span>
              </section>
              <p>{question.question}</p>
                  <code>
                    <pre>
                      <textarea id='code-col'>
                        {question.code_block}
                      </textarea>
                    </pre>
                  </code>
            </section>  

            <section className="uq-right-side m10">
              <button className="topicPill m10" style={{borderColor:`${question.color}`, background: `radial-gradient(at top left, ${question.color},${question.color}, black)`}} key={index}>
             {question.topic}
             </button>
             <button className="bigCircle jump shadowed" onClick={()=> {
               this.props.toggleModal(); 
               this.props.setModalId(question.q_id);
              }}>
              <i className="fa fa-2x fa-lightbulb-o" aria-hidden="true"></i>
             </button>
            </section>
          </div>
        );
      }
    );
    return (
      <div className="questions-array">
        {activeQuestions}
      </div>
    );
  }
}

const mapStateToProps= state=> state;
export default connect(mapStateToProps, { toggleModal, setModalId })(MentorQuestionCard);
