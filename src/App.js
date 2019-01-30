import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Routes from './routes';
import LandingPage from './components/LandingPage';

class App extends Component {
  async componentDidMount() {
    const { data } = await axios.get('/api/users');
    console.log('data:', data);
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <LandingPage />
          <Routes />
        </header>
      </div>
    );
  }
}

export default App;
