import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reqUser } from '../../redux/reducer.js';
import axios from 'axios';
import './TopBar.css';

class TopBar extends Component {
  constructor() {
    super();

    this.state= {
      cohort: 'DM9',
      campus: 'DALLAS'
    }
  }

  // componentWillMount(){
  //   axios.get('/api/cohort').then(response=> {
  //     this.setState({ cohort: response.data });
  //   });
  //   axios.get('/api/campus').then(response=> {
  //     this.setState({ campus: response.data });
  //   });
  // }

  render() {
    console.log(this.props.user);
    return (
    <div className="topBar-main-container flexed">
      <div className='topBar-left'>
        <img width='60px' src={`http://192.241.205.79/wp-content/uploads/2017/06/cropped-cropped-cropped-devmountain_logo-1-1.png`}/>
        <span children={`${this.state.cohort}`}/><i className="fa fa-circle"></i><span children={`${this.state.campus}`}/>
      </div>

      <div className='topBar-right'>
        <span children='LOGOUT'/>
      </div>
    </div>
    )
  }
}

const mapStateToProps= state=> {
  const { user }= state;
  return {
    user
  };
};

export default connect(mapStateToProps, { reqUser })(TopBar);
