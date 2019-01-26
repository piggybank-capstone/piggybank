import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Plaid from './Plaid';
import Accounts from './Accounts';
import Transactions from './Transactions';
/**
 * COMPONENT
 */
export const UserHome = props => {
  const { name, accounts, transactions } = props;
  return (
    <div>
      <h3>Welcome {name}!</h3>
      <Plaid />
      {accounts.length > 0 && <Accounts />}
      {transactions.length > 0 && <Transactions />}
    </div>
  );
};

/**
 * CONTAINER
 */
const mapStateToProps = state => {
  return {
    name: state.user.firstName,
    accounts: state.accounts,
    transactions: state.transactions,
  };
};

export default connect(mapStateToProps)(UserHome);

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string,
};
