import React, { Component } from 'react';
import UserList from './UserList';
import './StudentView.css';
import {connect} from 'react-redux';
import QuestionForm from './QuestionForm/QuestionForm';
import ActionCard from './ActionCard/ActionCard';

class StudentView extends Component {
  constructor(){
    super();

  }

  render() {
    console.log(this.props)
    return (
      <div id="StudentView">
        <section style={{display: 'inline-block'}}>
        {this.props.actionAskOrGetHelp === 'action'?
        <ActionCard/>:
        this.props.actionAskOrGetHelp === "question"?
        <QuestionForm/>:''
        }
        </section>
        <UserList />
      </div>
    );
  }
}

const mapStateToProps = state => state;
// const mapStateToProps = (state) => {
//  return {
//    actionAskOrGetHelp: actionAskOrGetHelp
//  }
// }

export default connect(mapStateToProps)(StudentView);
