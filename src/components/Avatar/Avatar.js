import React, { Component } from 'react';
import axios from 'axios';
import './Avatar.css';

class Avatar extends Component {
  constructor(props) {
    super(props);
    this.state ={
      hovered: false
    }
    this.setButtonHovered = this.setButtonHovered.bind(this)
  }

  setButtonHovered(val){
    this.setState({hovered: val})
  }

  render() {
    console.log('avatar props', this.props)
    return (
       
        <div className="user-card" onMouseEnter={() => this.setButtonHovered(true)} 
        onMouseLeave={() => this.setButtonHovered(false)}>
        {this.state.hovered?<div className="user-tooltip">
          {this.props.user.name}
        </div>:''}
          <div className="user-card-left" style={{}}>
            <div className="user-avatar shadowed" style={{backgroundImage:`url('${this.props.user.image_url}')`}}/>
          </div>

          <div className="user-card-right">
            {/* <small>{this.props.user.name.split(' ')[0]}</small> */}
          </div>
        </div>     
    )
  }
}

export default Avatar;
