import React, { Component } from 'react';
import { connect } from 'react-redux';

/* COMPONENT */
class Accounts extends Component {
  render() {
    const { accounts } = this.props;
    return (
      <div>
        <h4>Accounts</h4>
        <table>
          <tr>
            <th scope="row">Account</th>
            <th scope="row">Official Name</th>
            <th scope="row">Type</th>
            <th scope="row">Available Balance</th>
            <th scope="row">Current Balance</th>
          </tr>
          {accounts.map(account => {
            return (
              <tr key={account.id}>
                <td>{account.name}</td>
                <td>{account.official_name}</td>
                <td>{account.subtype}</td>
                <td>{account.balances.available}</td>
                <td>{account.balances.current}</td>
              </tr>
            );
          })}
        </table>
      </div>
    );
  }
}

const mapState = state => {
  return {
    accounts: state.accounts,
  };
};

export default connect(mapState)(Accounts);
