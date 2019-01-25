import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch } from 'react-router-dom';
import App from './App';
import Trends from './components/Trends';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {}

  render() {
    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        {/* <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} /> */}
        <Route path="/trends" component={Trends} />
        <Route path="/" component={App} />
        {/* {isLoggedIn && (
          <Switch> */}
        {/* Routes placed here are only available after logging in  */}
        {/* <Route path="/home" component={UserHome} />
          </Switch>
        )} */}
        {/* Displays our Login component as a fallback */}
        {/* <Route component={Login} /> */}
      </Switch>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    //   // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    //   // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    //   isLoggedIn: !!state.user.id,
  };
};

const mapDispatch = dispatch => {
  return {
    //   loadInitialData() {
    //     dispatch(me());
    //   },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(Routes)
);
