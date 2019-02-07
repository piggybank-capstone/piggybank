import React, { Component } from 'react';
import './App.css';

import Routes from './routes';
import NavBar from './components/NavBar';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          
        </header><NavBar />
          <Routes />
      </div>
    );
  }
}

export default App;
