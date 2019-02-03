import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Routes from './routes';
import NavBar from './components/NavBar';

class App extends Component {
  async componentDidMount() {
    const { data } = await axios.get('/api/users');
    console.log('data:', data);
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <NavBar />
          <Routes />
        </header>
      </div>
    );
  }
}

export default App;
