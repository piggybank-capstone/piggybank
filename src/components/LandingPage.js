import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NavBar from './NavBar';
import Header from './Header';

//if not logged in show this
//else if it is. show User homepage
export const LandingPage = props => {
  return (
    <div>
      {props.isLoggedin ? (
        <NavBar />
      ) : (
        <div>
          <NavBar />
          <Header />
          <p>Get advice on budgeting with piggybot.</p>
        </div>
      )}
      ;
    </div>
  );
};

const mapState = state => {
  return {
    isLoggedin: !!state.user.id
  };
};
export default connect(mapState)(LandingPage);
