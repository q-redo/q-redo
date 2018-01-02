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

<<<<<<< HEAD
  componentDidMount(){
    this.setState({ question: this.props.question});
    console.log(this.props.question)
    axios.get(`/api/answers/${this.props.questionId}`).then(answers=> {
=======
  componentWillMount(){
    axios.get(`/api/questions/${this.props.match.params.id}`).then(response=> {
      this.setState({ question: response.data[0] });
    });

    axios.get(`/api/answers/${this.props.match.params.id}`).then(answers=> {
>>>>>>> master
      this.setState({ answersList: answers.data });
    });
  }
  componentWillUpdate(){
    axios.get(`/api/answers/${this.props.questionId}`).then(answers=> {
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
