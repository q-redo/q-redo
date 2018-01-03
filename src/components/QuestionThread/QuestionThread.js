import React, {Component} from 'react';
import axios from 'axios';
import './QuestionThread.css';
import ThreadAnswer from '../ThreadAnswer/ThreadAnswer';
import { connect } from 'react-redux';


class QuestionThread extends Component{
  constructor(){
    super();

    this.state= {
      question: {},
      answersList: [],
    }
  }

  componentDidMount(){
    this.setState({ question: this.props.question});
    axios.get(`/api/answers/${this.props.question.q_id}`).then(answers=> {
      this.setState({ answersList: answers.data });
    });
  }
  componentWillUpdate(){
    axios.get(`/api/answers/${this.props.question.q_id}`).then(answers=> {
      this.setState({ answersList: answers.data });
    });
  }
  render(){
    const answers= this.state.answersList.map((answer, i)=> {
      return <ThreadAnswer answer={answer} key={i}/>
    });

    if(answers.length){
    return <div className="answers-holder">{answers}</div>
    }else {
      return ''
    }
  }
}

const mapStateToProps= state=> state;
export default connect(mapStateToProps)(QuestionThread);
