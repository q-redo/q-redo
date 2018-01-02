import React, {Component} from 'react';
import axios from 'axios';
import './QuestionThread.css';


class QuestionThread extends Component{
  constructor(){
    super();

    this.state= {
      question: {},
      answersList: [],
      upvoted: false,
      downvoted: false
    }
    this.upvote= this.upvote.bind(this);
    this.downvote= this.downvote.bind(this);
    this.toggleVerify= this.toggleVerify.bind(this);
  }

  componentWillMount(){
    axios.get(`/api/questions/${this.props.match.params.id}`).then(response=> {
      this.setState({ question: response.data[0] });
    });

    axios.get(`/api/answers/${this.props.match.params.id}`).then(answers=> {
      this.setState({ answersList: answers.data });
    });
  }

  componentWillUpdate(){
    axios.get(`/api/answers/${this.props.match.params.id}`).then(answers=> {
      this.setState({ answersList: answers.data });
    });
  }
 
  upvote(id){
    axios.put(`/api/upvote/answers/${id}`);
    this.setState({ downvoted: false, upvoted: true });
  }

  downvote(id){
    axios.put(`/api/downvote/answers/${id}`);
    this.setState({ downvoted: true, upvoted: false });
  }

  toggleVerify(id){
    axios.put(`/api/verify/answers/${id}`);
  }

  render(){
    const answers= this.state.answersList.map((answer, i)=> {
      return(
        answer.best_answer === true ?
        <div className='answer-container best-answer curved m10' key={answer.id}>
          <h1>Answer:</h1>
          <p>{answer.answer}</p>
          <hr />

          { answer.code_block ? 
            <div id='code-col' className='answer-code-box curved'>
              <code>
                <pre>
                  {answer.code_block}
                </pre>
              </code>
            </div> : null }
          
          <div className='answer-container-bot'>
            <div className='answer-container-bot-left'>
              {
                this.state.upvoted === true ? 
                <div>
                <button disabled className='upvote vote-btn' style={{color:"darkorange"}} value={answer.id} onClick={(e)=> {this.upvote(e.target.value)}}>&#x21E7;</button>
                <button className='downvote vote-btn' value={answer.id} onClick={ (e)=> {this.downvote(e.target.value)} }>&#x21E9;</button>
                <p>SCORE: {answer.score}</p> 
                </div>
                : this.state.downvoted === true ?
                <div>
                <button className='upvote vote-btn' value={answer.id} onClick={(e)=> {this.upvote(e.target.value)}}>&#x21E7;</button>
                <button disabled className='downvote vote-btn' style={{color:"rgb(113,166,255)"}}value={answer.id} onClick={ (e)=> {this.downvote(e.target.value)} }>&#x21E9;</button>
                <p>SCORE: {answer.score}</p>
                </div>
                :
                <div>
                <button className='upvote vote-btn' value={answer.id} onClick={(e)=> {this.upvote(e.target.value)}}>&#x21E7;</button>
                <button className='downvote vote-btn' value={answer.id} onClick={ (e)=> {this.downvote(e.target.value)} }>&#x21E9;</button>
                <p>SCORE: {answer.score}</p>
                </div>
              }
            </div>

            <div className='answer-container-bot-right'>
              <button value={answer.id} onClick={ (e)=> {this.toggleVerify(e.target.value)} }>Unverify</button>
            </div>
          </div>
        </div>
        //Turnary that decides whether an answer card is rendered as Verified or Normal answer
        :
        <div className='answer-container curved m10' key={answer.id}>
          <h1>Answer:</h1>
          <p>{answer.answer}</p>
          <hr />

          { answer.code_block ? 
            <div id='code-col' className='answer-code-box curved'>
              <code>
                <pre>
                  {answer.code_block}
                </pre>
              </code>
            </div> : null }

          <div className='answer-container-bot'>
            <div className='answer-container-bot-left'>
            {
                this.state.upvoted === true ? 
                <div>
                <button disabled className='upvote vote-btn' style={{color:"darkorange"}} value={answer.id} onClick={(e)=> {this.upvote(e.target.value)}}>&#x21E7;</button>
                <button className='downvote vote-btn' value={answer.id} onClick={ (e)=> {this.downvote(e.target.value)} }>&#x21E9;</button>
                <p>SCORE: {answer.score}</p> 
                </div>
                : this.state.downvoted === true ?
                <div>
                <button className='upvote vote-btn' value={answer.id} onClick={(e)=> {this.upvote(e.target.value)}}>&#x21E7;</button>
                <button disabled className='downvote vote-btn' style={{color:"rgb(113,166,255)"}}value={answer.id} onClick={ (e)=> {this.downvote(e.target.value)} }>&#x21E9;</button>
                <p>SCORE: {answer.score}</p>
                </div>
                :
                <div>
                <button className='upvote vote-btn' value={answer.id} onClick={(e)=> {this.upvote(e.target.value)}}>&#x21E7;</button>
                <button className='downvote vote-btn' value={answer.id} onClick={ (e)=> {this.downvote(e.target.value)} }>&#x21E9;</button>
                <p>SCORE: {answer.score}</p>
                </div>
              }
            </div>
              <button value={answer.id} onClick={ (e)=> {this.toggleVerify(e.target.value)} }>Verified Answer</button>
          </div>
        </div>
      )
    });
    return(
      <div className='main-container'>
        <div className='question-thread-container curved'>
          <div className='question-container curved m10'>
            <h1>Question:</h1>
            { this.state.question.question }
            <hr/>
            
            <div id='code-col' className='answer-code-box curved'>
              <code>
                <pre>
                  {this.state.question.code_block}
                </pre>
              </code>
            </div>

          </div>
          {answers}
        </div>
      </div>
    )
  }
}


export default QuestionThread;
