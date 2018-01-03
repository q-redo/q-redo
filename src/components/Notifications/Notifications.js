import React, { Component } from 'react';
import { connect } from 'react-redux';
import Sound from 'react-sound';
import './notifications.css';
import { WSATYPE_NOT_FOUND } from 'constants';

import Punch from './punchfloor.mp3';

class Notifications extends Component {
  constructor() {
    super();
    this.state = {
      questionList: [],
      audiostate: [],
      highestqid: 0,
      slidingState: 'notificationbox curved shadowed hideit m10'
    };
  }
  stateChanger() {
    this.setState({ audiostate: [Sound.status.PLAYING] });
  }

  clearAnimation = function() {
    this.setState({
      slidingState: 'notificationbox curved shadowed hideit m10'
    });
  };
  componentWillReceiveProps(props) {
    const clear = () => this.clearAnimation();
    let ql = this.state.questionList;
    if (this.comparison() & (this.props.user.rank < 3)) {
      setTimeout(clear, 10000);
      this.setState({
        audiostate: [
          <Sound
            url={Punch}
            playStatus={Sound.status.PLAYING}
            playFromPosition={0 /* in milliseconds */}
            onLoading={this.handleSongLoading}
            onPlaying={this.handleSongPlaying}
            onFinishedPlaying={() => this.setState({ audiostate: [] })}
            autoLoad={false}
          />
        ],
        slidingState: 'notificationbox curved shadowed m10 notifyUp'
      });
    } else {
      this.setState({ questionList: this.props.questionList });
    }
    this.setState({ questionList: this.props.questionList });
    this.state.questionList.length > 0
      ? (document.title = this.state.questionList.length + ' open questions!')
      : (document.title = 'No questions.');
  }

  comparison = function() {
    let numbz = 0;
    for (var i = 0; i < this.props.questionList.length; i++) {
      if (this.props.questionList[i].q_id > numbz) {
        numbz = this.props.questionList[i].q_id;
      }
    }
    if (numbz > this.state.highestqid) {
      this.setState({ highestqid: numbz });
      return true;
    }
  };

  render() {
    console.log('state: ', this.state);
    return (
      <div>
        <div className={this.state.slidingState}>
          {this.state.audiostate[0]}
          A student is requesting help!
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Notifications);
