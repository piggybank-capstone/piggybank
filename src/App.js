import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import PlaidLink from 'react-plaid-link';
import { Login, Signup } from './AuthForm';

// hi

class App extends Component {
  async handleOnSuccess(token, metadata) {
    console.log('handleOnSuccess, token is ', token);
    console.log('handleOnSuccess, metadata is ', metadata);
    const access_token = await axios.post('/api/plaid/get_access_token', {
      public_token: token,
    });
    console.log(access_token);
  }
  handleOnExit() {
    console.log('handleOnExit');
  }
  async componentDidMount() {
    const { data } = await axios.get('/api/users');
    console.log('data:', data);
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>piggybank</p>
          <PlaidLink
            clientName="piggybank"
            env="sandbox"
            product={['auth', 'transactions']}
            publicKey="b50d6c5ab6295ff1aca2a4b971fc7e"
            onExit={this.handleOnExit}
            onSuccess={this.handleOnSuccess}
          >
            Open Link and Connect Your Bank!
          </PlaidLink>
          <Login />
          <Signup />
        </header>
      </div>
    );
  }
}

export default App;
