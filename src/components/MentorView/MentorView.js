import React, { Component } from 'react';
//import UserList from './UserList';
import MentorQuestionCard from '../MentorQuestionCard/MentorQuestionCard';
// import RecentQuestions from './RecentQuestions/RecentQuestions';
import UserList from '../UserList';
// import MentorCard from '../MentorCard/MentorCard';
// import RecentQuestions from '../RecentQuestions/RecentQuestions';
// import QuestionForm from '../QuestionForm/QuestionForm';
// import ActionCard from '../ActionCard/ActionCard';
import { connect } from 'react-redux';
import { toggleModal } from '../../redux/reducer.js';
import LoadingScreen from '../LoadingScreen/LoadingScreen.js';
import axios from 'axios';
import './MentorView.css';

class MentorView extends Component {
  componentWillMount() {
    axios
      .get('/api/me')
      .then(response => {
        if (response.data.rank === 3) {
          window.location.href = 'http://localhost:3000/student';
        }
      })
      .catch(
        error => {
          error.response.data === 'no_user'
            ? (window.location.href = 'http://localhost:3001/login')
            : null;
        }
        // window.location.href = 'http://localhost:3001/login'
      );
  }

  render() {
    return (
      <div id="MentorView">
        {!this.props.user.name ? <LoadingScreen /> : ''}
        <section style={{ display: 'inline-block' }}>
          <MentorQuestionCard />
        </section>
        <UserList />
      </div>
    );
  }
}

const mapStateToProps = state => state;
export default connect(mapStateToProps, { toggleModal })(MentorView);
