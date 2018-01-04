import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reqUser } from '../../redux/reducer.js';
import axios from 'axios';
import './TopBar.css';
import {Link} from 'react-router-dom'

class TopBar extends Component {
  constructor() {
    super();

    this.state= {
      cohort: 'DM9',
      campus: 'DALLAS'
    }
    this.handleLogout= this.handleLogout.bind(this)
  }

  handleLogout(){
   // NOTHING HERE YET
  }

  componentDidMount(){
    // axios.get('/api/cohort').then(response=> {
    //   this.setState({ cohort: response.data });
    // });
    // axios.get('/api/campus').then(response=> {
    //   this.setState({ campus: response.data });
    // });
  }

  render() {
    return (
    <div className="topBar-main-container flexed">
      <div className='topBar-left'>
        <img width='60px' src={`http://192.241.205.79/wp-content/uploads/2017/06/cropped-cropped-cropped-devmountain_logo-1-1.png`}/>
        <span children={`${this.state.cohort}`}/><i className="fa fa-circle"></i><span children={`${this.state.campus}`}/>
      </div>
      {this.props.user.rank === 1 ?
      <Link to='/adminview' style={{ textDecoration: 'none'}}><div className="topBar-right topBar-whitetext"><h3>Admin Console</h3></div></Link>
      : false
      }


      {this.props.user ? <h3>Welcome {this.props.user.name}</h3> : null}

      <div className='topBar-right'>
        <span onClick={this.handleLogout} children='Logout'/>
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
