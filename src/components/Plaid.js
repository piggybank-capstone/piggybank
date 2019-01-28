import React, { Component } from 'react';
import PlaidLink from 'react-plaid-link';
import { connect } from 'react-redux';
import { getAccounts, getTransactions } from '../store';

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

const mapDispatchToProps = {
  getAccounts,
  getTransactions,
};

export default connect(
  null,
  mapDispatchToProps
)(Plaid);
