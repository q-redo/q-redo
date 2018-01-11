import React, { Component } from 'react';
import axios from 'axios';
import './QuestionArchive.css';

class QuestionArchive extends Component{
    constructor(){
        super();

        this.state= {
            questionsList: [],
            topicsList: []
        }
    }

    componentWillMount(){
        axios.get('/api/me').then(response => {if(response.data.rank === 2){
            window.location.href = '/mentorview'
          }else if(response.data.rank === 3){
           window.location.href = '/student'
          }}).catch((error) => {
            error.response.data === "no_user"? window.location.href = '/login':null;
          }
          )
        axios.get('/api/archived/questions').then(questions=> {
            console.log(questions.data);
            this.setState({ questionsList: questions.data });
        });
    }

    render(){
        const question= this.state.questionsList.map((curr, i)=> {
            return (
                <div className='archive-list-container m10' key={i}>
                    <p>{curr.question}</p>
                    <p>{}</p>
                    <p>{curr.time}</p>
                </div>
            )
        });
        return(
            <div>
                <div className='archive-main-container curved shadowed m10'>
                    {question}
                </div>
            </div>
        )
    }
}

export default QuestionArchive;