import React, { Component } from 'react';
// import Moment from 'react-moment'; 
import axios from 'axios';
import hourglass from '../WaitingCard/hourglass.svg'
import Avatar from '../Avatar/Avatar'
import AnswerModal from '../AnswerModal/AnswerModal.js';
import { connect } from 'react-redux';
import { toggleModal, setModalId } from '../../redux/reducer.js';
import linked from '../Avatar/linked.svg';
import './MentorQuestionCard.css';

class MentorQuestionCard extends Component {
  constructor() {
    super();

    this.state = {
      activeQuestionsList: [],
      id: 0,
      voted: false,
      helping: false,
      studentId: 0
    };
    this.answeredQuestion = this.answeredQuestion.bind(this);
    this.setHelp= this.setHelp.bind(this);
    this.clearHelp= this.clearHelp.bind(this);
    this.linkToStudent= this.linkToStudent.bind(this);
  }

  //CWM get three most recent questions
  componentWillMount(){
    axios.get('/api/activeQuestions').then(response => {
      this.setState({ activeQuestionsList: response.data });
    });
  }

  componentWillUpdate(){
    axios.get('/api/activeQuestions').then(response => {
      this.setState({ activeQuestionsList: response.data });
    });
  }

  answeredQuestion(id){
    axios.put(`/api/questions/${id}`).then(response => {
      return response.data;
    });
  }

  setHelp(){
    this.setState({ helping: !this.state.helping });
  }

  linkToStudent(id){
    this.setState({ studentId: id });
    console.log(id);
  }

  clearHelp(id){
    // axios.delete(`/api/help/${id}`)
    // .then(response=>{
    //   this.setState({ activeQuestionsList: response.data });
    // });
  }

//We used conditional rendering in the map method to render different cards depending on the type of help/question the student needs.
  render() {
    const activeQuestions = this.state.activeQuestionsList.map(          
      (question, index) => {
        return (
          question.question === 'HELP' ?
          this.state.helping === false ? 
          <div className="user-help-card curved shadowed m10" key={index}>
              <div className='qh-avatar'>
                <Avatar av_user={{name: question.name, image_url: question.image_url}}/>         
              </div>

              <span style={{display: 'inline-block'}}>0:00 <img style={{width: '25px'}} src={hourglass} alt="hourglass spinning"/></span>

            <section className="uq-right-side m10">
             <button className="bigCircle jump shadowed" onClick={()=> {
               this.setHelp();
               this.linkToStudent(question.user_id);
              }}>
              <i className="fa fa-handshake-o" aria-hidden="true"></i>
             </button>
            </section>
          </div>
          :
          <div className="user-help-card curved shadowed m10" key={index}>
            <div>
            <button value={question.q_id} className="cancel-help-btn" onClick={(e)=> {
               this.clearHelp(e.target.value);
               this.setHelp();
              }}>X</button>

            </div>

            <div className='qh-avatar'>
              <Avatar av_user={{name: question.name, image_url: question.image_url}}/>
              <img style={{ marginRight: '75px', width: '50px'}} src={linked}/>  
              <Avatar av_user={{name: this.props.user.name, image_url: this.props.user.image_url}}/>
            </div>
          </div>              
          :
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
