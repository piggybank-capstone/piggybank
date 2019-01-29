import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../store';
import { NavLink } from 'react-router-dom';
import Rectangle_Logo from '../styles/Rectangle_Logo.png';

class NavBar extends Component {
  render() {
    const { isLoggedIn, handleClick } = this.props;
    return (
      <Toolbar>
        <div id="ico">
          <NavLink to={'/home'}>
            <img src={Rectangle_Logo} height="40" alt="piggybank logo" />
          </NavLink>
          <div id="nav">
            <div id="nav-right">
              {isLoggedIn ? (
                <Button color="inherit" onClick={handleClick}>
                  Logout
                </Button>
              ) : (
                <div>
                  <Button color="inherit" component={Link} to="/login">
                    Login
                  </Button>
                  <Button color="inherit" component={Link} to="/signup">
                    Signup
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </Toolbar>
    );
  }
}

const mapState = state => ({
  isLoggedIn: !!state.user.id
});

const mapDispatch = dispatch => ({
  handleClick() {
    dispatch(logout());
  }
});

export default connect(
  mapState,
  mapDispatch
)(NavBar);
