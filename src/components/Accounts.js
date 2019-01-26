import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/**
 * COMPONENT
 */
export const Accounts = props => {
  const { accounts } = props;
  return (
    <div>
      <h4>Accounts Component</h4>
      <ul>
        <li>list of accounts go here</li>
        <li>{accounts}</li>
      </ul>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapStateToProps = state => {
  return {
    accounts: state.accounts,
  };
};

export default connect(mapStateToProps)(Accounts);

/**
 * PROP TYPES
 */
Accounts.propTypes = {
  email: PropTypes.string,
};
