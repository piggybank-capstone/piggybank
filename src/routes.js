import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { me } from './store';

import {
  Trends,
  Login,
  Signup,
  UserHome,
  Budget,
  Accounts,
  AddBudget,
  NotFound,
  LandingPage,
  MonthlyTotalChart,
  CategorySpending,
  MerchantChart,
} from './components';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;
    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}

        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />

        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/home" component={UserHome} />
            <Route path="/budget" component={Budget} />
            <Route exact path="/trends" component={Trends} />
            <Route path="/accounts" component={Accounts} />
            <Route path="/addABudget" component={AddBudget} />
            <Route
              path="/trends/category-spending"
              component={CategorySpending}
            />
            <Route
              path="/trends/monthly-totals"
              component={MonthlyTotalChart}
            />
            <Route path="/trends/category-merchant" component={MerchantChart} />
            <Route exact path="/" component={UserHome} />
            <Route component={NotFound} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback
        // <Route component={Login} /> */}
        <Route exact path="/" component={LandingPage} />
        <Route component={NotFound} />
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
    isLoggedIn: !!state.user.id,
  };
};

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me());
    },
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

Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};
