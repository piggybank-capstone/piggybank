import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import NavBar from './NavBar';
import Header from './Header';

//if not logged in show this
//else if it is. show User homepage
export const LandingPage = props => {
  return (
    <div>
      <NavBar />
      <Header />
      <p>Get advice on budgeting with piggybot.</p>
    </div>
  );
};

const mapState = state => {
  return {
    isLoggedin: !!state.user.id,
  };
};

export default withRouter(connect(mapState)(null)(LandingPage));
