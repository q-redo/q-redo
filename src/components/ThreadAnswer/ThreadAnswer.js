import React, {Component} from 'react';
import axios from 'axios';
import './ThreadAnswer.css';
import { connect } from 'react-redux';



class ThreadAnswer extends Component{
  constructor(props){
    super(props);

    this.state= {
      upvoted: false,
      downvoted: false,
    }
    this.toggleVerify= this.toggleVerify.bind(this);
    this.upvote= this.upvote.bind(this);
    this.downvote= this.downvote.bind(this);
    this.unUpvote = this.unUpvote.bind(this);
    this.unDownvote= this.unDownvote.bind(this);
  }

  componentWillMount(){
    console.log(this.props);
  }
 
  upvote(id){
    axios.put(`/api/upvote/answers/${id}`);
    this.setState({ downvoted: false, upvoted: true });
  }
  
  downvote(id){
    axios.put(`/api/downvote/answers/${id}`);
    this.setState({ downvoted: true, upvoted: false });
  }
          unUpvote(id){
            axios.put(`/api/downvote/answers/${id}`);
            this.setState({ downvoted: false, upvoted: false });
          }
          unDownvote(id){
            axios.put(`/api/upvote/answers/${id}`);
            this.setState({ downvoted: false, upvoted: false });
          }

  toggleVerify(id){ 
    axios.put(`/api/verify/answers/${id}`);
    // axios.put(`/api/inactive/question/${this.props.question.q_id}`);
  }


  render(){
      const answer = this.props.answer
      return(
        answer.best_answer === true ?
        <div className='answer-container best-answer curved m10 shadowed' key={answer.id}>
          <h1>Answer:</h1>
          <p>{answer.answer}</p>

          { answer.code_block ? 
            <div id='code-col' className='answer-code-box curved'>
              <pre>
              <code style={{ 
                maxWidth: "750px",
                whiteSpace: "pre-wrap",       
                whiteSpace: "-moz-pre-wrap",  
                whiteSpace: "-pre-wrap",      
                whiteSpace: "-o-pre-wrap",   
                wordWrap: "break-word"
              }}>
                {answer.code_block}
              </code>
              </pre>
            </div> : null }
            <hr />
          
          <div className='answer-container-bot'>
            <div className='answer-container-bot-left'>
            <div>
                <i style={{color:`${this.state.upvoted?'darkorange':'white'}`}}         onClick={!this.state.upvoted?  (e)=> {this.upvote(answer.id)}  :(e)=> {this.unUpvote(answer.id)}} className="upvote  m10 fa fa-lg fa-thumbs-up" aria-hidden="true"></i>
                <i style={{color:`${this.state.downvoted?"rgb(113,166,255)":'white'}`}} onClick={!this.state.downvoted?(e)=> {this.downvote(answer.id)}:(e)=> {this.unDownvote(answer.id)}} className="downvote m10  fa fa-lg fa-thumbs-down" aria-hidden="true"></i>
                {answer.score} points
                </div>
            </div>

            <div className='answer-container-bot-right'>
            { this.props.user.user_id === this.props.question.user_id ?
              <button onClick={ (e)=> {this.toggleVerify(answer.id)} }>Unverify</button>
              : null
            }  
            </div>
          </div>
        </div>
        //Turnary that decides whether an answer card is rendered as Verified or Normal answer
        :
        <div className='answer-container curved m10' key={answer.id}>
          <h1>Answer:</h1>
          <p>{answer.answer}</p>

          { answer.code_block ? 
            <div id='code-col' className='answer-code-box curved'>
              <code style={{ 
                  maxWidth: "750px",
                  whiteSpace: "pre-wrap",       
                  whiteSpace: "-moz-pre-wrap",  
                  whiteSpace: "-pre-wrap",      
                  whiteSpace: "-o-pre-wrap",   
                  wordWrap: "break-word"
                }}>
                  {answer.code_block}
              </code>
            </div> : null }
            <hr />

          <div className='answer-container-bot'>
            <div className='answer-container-bot-left'>
                <div>
                <i style={{color:`${this.state.upvoted?'darkorange':'white'}`}}  onClick={!this.state.upvoted?  (e)=> {this.upvote(answer.id)}  :(e)=> {this.unUpvote(answer.id)}}className="upvote m10 fa fa-lg fa-thumbs-up" aria-hidden="true"></i>
                <i style={{color:`${this.state.downvoted?"rgb(113,166,255)":'white'}`}} onClick={!this.state.downvoted?(e)=> {this.downvote(answer.id)}:(e)=> {this.unDownvote(answer.id)}} className="downvote m10 fa fa-lg fa-thumbs-down" aria-hidden="true"></i>
                {answer.score} points
                </div>
            </div>
            { this.props.user.user_id === this.props.question.user_id ?
              <button onClick={ (e)=> {this.toggleVerify(answer.id)} }>Verified Answer</button>
              : null
            }
          </div>
        </div>
      )
    };
  }



  const mapStateToProps= state=> state;
  export default connect(mapStateToProps)(ThreadAnswer);
