import React, { Component } from 'react';
import PlaidLink from 'react-plaid-link';
import { connect } from 'react-redux';
import { getAccounts, getTransactions } from '../store';
import Button from '@material-ui/core/Button';

class Plaid extends Component {
  handleOnSuccess = (token, metadata) => {
    this.props.getAccounts(token);
    this.props.getTransactions(token);
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
          <Button>Open Link and Connect Your Bank!</Button>
        </PlaidLink>
      </div>
    );
  }
}

const mapDispatchToProps = {
  getAccounts,
  getTransactions
};

export default connect(
  null,
  mapDispatchToProps
)(Plaid);
