import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Plaid from './Plaid';
import Accounts from './Accounts';
/**
 * COMPONENT
 */
export const UserHome = props => {
  const { name } = props;
  return (
    <div>
      <h3>Welcome {name}!</h3>
      <Plaid />
      <Accounts />
    </div>
  );
};

/**
 * CONTAINER
 */
const mapStateToProps = state => {
  return {
    name: state.user.firstName,
  };
};

export default connect(mapStateToProps)(UserHome);

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string,
};
