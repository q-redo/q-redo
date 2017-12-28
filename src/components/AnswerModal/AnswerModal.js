import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleModal } from '../../redux/reducer.js';
import axios from 'axios';
import './AnswerModal.css';

class AnswerModal extends Component{
    constructor(props){
        super(props);

        this.state={
            question: {},
            answer: '',
            code: ''
        }
        this.handleAnswer= this.handleAnswer.bind(this);
        this.handleCode= this.handleCode.bind(this);
        this.submitAnswer= this.submitAnswer.bind(this);
    }

    componentDidMount(){
        axios.get(`/api/questions/${this.props.questionId}`).then(response=> {
            this.setState({ question: response.data[0], code: response.data[0].code_block });
            console.log(response.data[0].code_block);
        })
    }

    handleAnswer(input){
        this.setState({ answer: input });
    }

    handleCode(input){
        this.setState({ code: input });
    }

    submitAnswer(){
        axios.post('/api/answers', { answer: this.state.answer, code_block: this.state.code, user_id: this.props.user.user_id, q_id: this.props.questionId })
    }

    render(){
        return(
        <div className='modal-background'>
            <div className='modal-main-container curved'>
                <h1>Sexy Modal</h1>
                <hr />
                <p>Question ID: {this.props.questionId}</p>
                <p>{this.state.question.question}</p>
                <code>
                    <pre>
                    <textarea id='code-col' type='text' value={this.state.code} onChange={ (e)=> this.handleCode(e.target.value)}>
                        
                    </textarea>
                    </pre>
              </code>

                Answer: <input type='text' onChange={ (e)=> this.handleAnswer(e.target.value)}></input>
                
                <i onClick={()=>this.props.toggleModal()} className="fa fa-lg fa-times" aria-hidden="true"></i>
                <button onClick={()=> {
                    this.submitAnswer();
                    this.props.toggleModal();
                    }}>
                    Submit Answer
                </button>
            </div>
        </div>
        )
    }
}

const mapStateToProps= state=> state;
export default connect(mapStateToProps, { toggleModal })(AnswerModal);