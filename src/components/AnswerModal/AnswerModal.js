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
        this.submitAnswer= this.submitAnswer.bind(this);
    }

    componentWillMount(){
        axios.get('/api/questions/:id').then(response=> {
            this.setState({ question: response.data});
            console.log(response.data);
        })
    }

    handleAnswer(input){
        this.setState({ answer: input });
    }

    submitAnswer(){
        axios.post('/api/answers', { answer: this.state.answer, user_id: this.props.user.user_id, q_id: this.props.questionId })
    }

    render(){
        return(
        <div className='modal-background'>
            <div className='modal-main-container curved'>
                <h1>Sexy Modal</h1>
                <p>Question ID: {this.props.questionId}</p>

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