import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import NavBar from './NavBar';

const LandingPage = () => {
  return (
    <div>
<<<<<<< HEAD
      <div id="header"> We Make Saving Fun</div>
      <h2>Manage your finances and budget with Piggybot.</h2>
=======
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
>>>>>>> separated get access token route with get accounts and transactions routes
    </div>
  );
};

<<<<<<< HEAD
export default LandingPage;
=======
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
>>>>>>> separated get access token route with get accounts and transactions routes
