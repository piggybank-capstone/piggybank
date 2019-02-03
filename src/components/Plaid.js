import React, { Component } from 'react';
import PlaidLink from 'react-plaid-link';
import { connect } from 'react-redux';
import { getAccounts, getTransactions } from '../store';
import Button from '@material-ui/core/Button';
<<<<<<< HEAD
import '../styles/index.css';
=======
import Axios from 'axios';
>>>>>>> separated get access token route with get accounts and transactions routes

class Plaid extends Component {
  handleOnSuccess = async (token, metadata) => {
    await Axios.post('/api/plaid/get_access_token', { public_token: token });
    this.props.getAccounts();
    this.props.getTransactions();
  };
  handleOnExit() {
    console.log('handleOnExit');
  }
  render() {
    return (
      <div id="plaid-link">
        <PlaidLink
          clientName="piggybank"
          env="sandbox"
          product={['auth', 'transactions']}
          publicKey="b50d6c5ab6295ff1aca2a4b971fc7e"
          onExit={this.handleOnExit}
          onSuccess={this.handleOnSuccess}
        >
          <div id="plaid-button">
            <Button>Open Link and Connect Your Bank!</Button>
          </div>
        </PlaidLink>
      </div>
    );
  }
}

const mapDispatchToProps = {
  getAccounts,
  getTransactions,
};

export default connect(
  null,
  mapDispatchToProps
)(Plaid);
