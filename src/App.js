import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Axios from 'axios';
// import Plaid from 'plaid';

// const plaidClient = new plaid.Client(
//   process.env.PLAID_CLIENT_ID,
//   process.env.PLAID_SECRET,
//   process.env.PUBLIC_KEY,
//   plaid.environments.sandbox,
//   { version: '2018-05-22' }
// );

class App extends Component {
  async componentDidMount() {
    const { data } = await Axios.get('/api/users');
    console.log('data:', data);
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <p>piggybank</p>
          {/* <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a> */}
        </header>
      </div>
    );
  }
}

export default App;
