import React, { Component } from 'react';
import Router from './router';
import TopBar from './components/TopBar/TopBar';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      user: { id: 1 }
    };

    this.handleLogin = this.handleLogin.bind(this);
  }

  componentWillMount() {
    
  }

  handleLogin() {
    window.location.href = 'http://localhost:3001/login';
  }

  render() {
    return (
      <div  className="App flexed">
        <TopBar/>
        <section style={{maxWidth: '670px'}}>
        {Router}
        <button onClick={() => this.handleLogin()}>TEST AUTH0</button>
        </section>
      </div>
    );
  }
}

export default App;
