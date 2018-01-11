import React, { Component } from "react"
//import UserList from './UserList';
import MentorQuestionCard from "../MentorQuestionCard/MentorQuestionCard"
// import RecentQuestions from './RecentQuestions/RecentQuestions';
import UserList from "../UserList"
// import MentorCard from '../MentorCard/MentorCard';
// import RecentQuestions from '../RecentQuestions/RecentQuestions';
// import QuestionForm from '../QuestionForm/QuestionForm';
// import ActionCard from '../ActionCard/ActionCard';
import { connect } from 'react-redux';
import { toggleModal, redirectStudent } from '../../redux/reducer.js';
import LoadingScreen from '../LoadingScreen/LoadingScreen.js';
import MentorList from '../MentorList/MentorList';
import axios from 'axios';
import './MentorView.css';

class MentorView extends Component {
  componentWillMount() {
    this.props.redirectStudent().then(() => {
      const { user } = this.props;
      setTimeout(function() {
       if(user){  if (!user.user_id) {
          window.location.href = 'http://localhost:3001/login'
        } }
      }, 8000);
    });
  }

  render() {
    return (
      <div id="MentorView">
        { this.props.user ? !this.props.user.name ? <LoadingScreen /> : '' : false}
        <section style={{ display: 'inline-block' }}>
          <MentorQuestionCard />
        </section>
        <div
          style={{
            display: 'inline-flex',
            flexDirection: 'column',
            float: 'right'
          }}
        >
          <UserList />
          <MentorList />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => state;
export default connect(mapStateToProps, { toggleModal, redirectStudent })(
  MentorView
);
