import React, { Component } from 'react';
import axios from 'axios';
import PlaidLink from 'react-plaid-link';

class Plaid extends Component {
  async handleOnSuccess(token, metadata) {
    console.log('handleOnSuccess, token is ', token);
    console.log('handleOnSuccess, metadata is ', metadata);
    const res = await axios.post('/api/plaid/accounts/get', {
      public_token: token,
      metadata: metadata,
    });
    console.log('res from front end axios request is ', res);
  }
  handleOnExit() {
    console.log('handleOnExit');
  }
  render() {
    return (
      <div>
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
      </div>
    );
  }
}

export default Plaid;
