import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  componentWillMount(){
    axios.get('/api/questions').then(response=> console.log(response.data));
  }

  render() {
    return (
      <div className="App">
        <h1>Q2</h1>
      </div>
    );
  }
}

export default App;
