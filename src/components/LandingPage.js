import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import NavBar from './NavBar';

const LandingPage = () => {
  return (
    <div>
      <div id="header"> We Make Saving Fun</div>
      <h2>Manage your finances and budget with Piggybot.</h2>
    </div>
  );
};

export default LandingPage;
