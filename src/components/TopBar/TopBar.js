import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reqUser, changeTheme } from '../../redux/reducer.js';
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
    this.handleColor= this.handleColor.bind(this)
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
  handleColor(color){
    function hexToComplimentary(hex){

      // Convert hex to rgb
      // Credit to Denis http://stackoverflow.com/a/36253499/4939630
      var rgb = 'rgb(' + (hex = hex.replace('#', '')).match(new RegExp('(.{' + hex.length/3 + '})', 'g')).map(function(l) { return parseInt(hex.length%2 ? l+l : l, 16); }).join(',') + ')';
  
      // Get array of RGB values
      rgb = rgb.replace(/[^\d,]/g, '').split(',');
  
      var r = rgb[0], g = rgb[1], b = rgb[2];
  
      // Convert RGB to HSL
      // Adapted from answer by 0x000f http://stackoverflow.com/a/34946092/4939630
      r /= 255.0;
      g /= 255.0;
      b /= 255.0;
      var max = Math.max(r, g, b);
      var min = Math.min(r, g, b);
      var h, s, l = (max + min) / 2.0;
  
      if(max == min) {
          h = s = 0;  //achromatic
      } else {
          var d = max - min;
          s = (l > 0.5 ? d / (2.0 - max - min) : d / (max + min));
  
          if(max == r && g >= b) {
              h = 1.0472 * (g - b) / d ;
          } else if(max == r && g < b) {
              h = 1.0472 * (g - b) / d + 6.2832;
          } else if(max == g) {
              h = 1.0472 * (b - r) / d + 2.0944;
          } else if(max == b) {
              h = 1.0472 * (r - g) / d + 4.1888;
          }
      }
  
      h = h / 6.2832 * 360.0 + 0;
  
      // Shift hue to opposite side of wheel and convert to [0-1] value
      h+= 180;
      if (h > 360) { h -= 360; }
      h /= 360;
  
      // Convert h s and l values into r g and b values
      // Adapted from answer by Mohsen http://stackoverflow.com/a/9493060/4939630
      if(s === 0){
          r = g = b = l; // achromatic
      } else {
          var hue2rgb = function hue2rgb(p, q, t){
              if(t < 0) t += 1;
              if(t > 1) t -= 1;
              if(t < 1/6) return p + (q - p) * 6 * t;
              if(t < 1/2) return q;
              if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
              return p;
          };
  
          var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
          var p = 2 * l - q;
  
          r = hue2rgb(p, q, h + 1/3);
          g = hue2rgb(p, q, h);
          b = hue2rgb(p, q, h - 1/3);
      }
  
      r = Math.round(r * 255);
      g = Math.round(g * 255); 
      b = Math.round(b * 255);
  
      // Convert r b and g values to hex
      rgb = b | (g << 8) | (r << 16); 
      return "#" + (0x1000000 | rgb).toString(16).substring(1);
  }  
    function shadeColor2(color, percent) {   
      var f=parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
      return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
     }

    this.props.changeTheme([hexToComplimentary(color), shadeColor2(color, -0.4), shadeColor2(color, -0.8)])
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
      <input type="color" onChange={(e)=>this.handleColor(e.target.value)}/>
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

export default connect(mapStateToProps, { reqUser , changeTheme})(TopBar);
