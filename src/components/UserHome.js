import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Accounts from './Accounts';
import Transactions from './Transactions';
import Plaid from './Plaid';

/**
 * COMPONENT
 */
export const UserHome = props => {
  const { name, accounts, transactions, isLoading } = props;
  return (
    <div>
      <h3>Welcome {name}!</h3>
      <Plaid />
      {isLoading && <h2>LOADING...</h2>}
      {accounts.length > 0 && <Accounts />}
      {transactions.length > 0 && <Transactions />}
    </div>
  );
};

/**
 * CONTAINER
 */
const mapStateToProps = state => {
  const { user, accounts, transactions } = state;
  return {
    name: user.firstName,
    accounts: accounts.accounts,
    isLoading: accounts.isLoading,
    transactions,
  };
};

export default connect(mapStateToProps)(UserHome);

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string,
};
