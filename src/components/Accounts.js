import React, { Component } from 'react';
import { connect } from 'react-redux';

/* COMPONENT */
class Accounts extends Component {
  render() {
    const { accounts } = this.props;
    return (
      <div>
        <h4>Accounts List</h4>
        {accounts.map(account => (
          <div key={account.id}>
            <ul>
              <li>
                Account Name: {account.name} ending in {account.mask}
              </li>
              <li>Account Official Name: {account.official_name}</li>
              <li>Account Subtype: {account.subtype}</li>
              <li>Account Current Balance: {account.balances.current}</li>
            </ul>
          </div>
        ))}
        <table>
          <tr>
            <th>Account</th>
          </tr>
          {accounts.map(account => {
            return (
              <tr>
                <td>{account.name}</td>
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
