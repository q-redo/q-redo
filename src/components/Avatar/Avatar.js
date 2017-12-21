import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import linked from './linked.svg';
import './Avatar.css';

class Avatar extends Component {
  constructor(props) {
    super(props);
    this.state ={
      paired_user: {user_id: 27, name: "Devin Jackson", image_url: 'https://78.media.tumblr.com/avatar_e4652bb57c78_128.png'}

    }
  }




  render() {
    console.log('avatar props', this.props)
    return (
       
        <div className="user-card" >
        <div className="user-tooltip curved shadowed">
        {this.props.av_user.name}
        </div>
          <div className="user-card-left" style={{}}>
            <div className="user-avatar shadowed" style={{backgroundImage:`url('${this.props.av_user.image_url}')`}}/>
            {
            this.props.av_user.paired?'':  
            this.props.av_user.waiting_type === 'question'?
            <i className="fa fa-3x fa-question"/>:
            this.props.av_user.waiting_type === 'help'?
            <i className="fa fa-3x fa-exclamation"/>:''}
          </div>

          <div className="user-card-right">
            
            {this.props.av_user.paired?
            <div>
            <img style={{position: 'absolute', marginLeft: '-26px',marginTop: '-5px', width: '50px'}}src={linked}/>  
            <div className="user-avatar shadowed" style={{marginLeft: '25px', backgroundImage:`url('${this.state.paired_user.image_url}')`}}/>
            </div>
            :
            <small>{this.props.av_user.name.split(' ')[0]}</small>}
          </div>
        </div>     
    )
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Avatar);
