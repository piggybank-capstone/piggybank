import React, { Component } from 'react';
import { connect } from 'react-redux';

/**
 * COMPONENT
 */
class Transactions extends Component {
  render() {
    const { transactions } = this.props;
    return (
      <div>
        <h4>Transaction List</h4>
        {transactions.map(transaction => (
          <div key={transaction.id}>
            <ul>
              <ul>Name: {transaction.name}</ul>
              <ul>Amount: ${transaction.amount}</ul>
              <ul>Date: {transaction.date}</ul>
            </ul>
          </div>
        ))}
      </div>
    );
  }
}

const mapState = state => {
  return {
    transactions: state.transactions,
  };
};

export default connect(mapState)(Transactions);
