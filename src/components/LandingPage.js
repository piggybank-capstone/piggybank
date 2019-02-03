import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import NavBar from './NavBar';

const LandingPage = () => {
  return (
    <div>
      {props.isLoggedin ? (
        <NavBar />
      ) : (
        <div>
          <NavBar />
          <div id="header"> We Make Saving Fun</div>
          <h2>Manage your finances and budget with us!</h2>
        </div>
      )}
      ;
    </div>
  );
};

const mapState = state => {
  return {
    isLoggedin: !!state.user.id,
  };
};

export default withRouter(
  connect(
    mapState,
    null
  )(LandingPage)
);
