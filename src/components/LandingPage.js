import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import NavBar from './NavBar';

export const LandingPage = props => {
  return (
    <div>
      {props.isLoggedin ? (
        <NavBar />
      ) : (
        <div>
          <NavBar />
          <div id="header"> Saving is Fun Again</div>
          <h2>Manage your finances and budget with Piggybot.</h2>
          <iframe
            title="piggybot"
            allow="microphone;"
            width="350"
            height="430"
            src="https://console.dialogflow.com/api-client/demo/embedded/8da1c4ff-793f-4de9-9ec9-d5168b87c73d"
          />
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

export default withRouter(
  connect(
    mapState,
    null
  )(LandingPage)
);
