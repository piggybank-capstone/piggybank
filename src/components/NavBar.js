import React, { Component } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { logout } from '../store';
import { NavLink, Link } from 'react-router-dom';
import Rectangle_Logo from '../styles/Rectangle_Logo.png';

class NavBar extends Component {
  render() {
    const { isLoggedIn, handleClick } = this.props;
    return (
      <Toolbar>
        <div id="nav">
          <div id="ico">
            <NavLink to={'/'}>
              <img
                id="logo"
                src={Rectangle_Logo}
                height="40"
                alt="piggybank logo"
              />
            </NavLink>
          </div>
          {isLoggedIn ? (
            <div id="nav-right">
              <NavLink to={'/budget'}>
                <Button color="inherit">Budgets</Button>
              </NavLink>
              <NavLink to={'/trends'}>
                <Button color="inherit">Trends</Button>
              </NavLink>
              <Button color="inherit" onClick={handleClick}>
                Logout
              </Button>
            </div>
          ) : (
            <div id="nav-right">
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/signup">
                Signup
              </Button>
            </div>
          )}
        </div>
      </Toolbar>
    );
  }
}

const mapState = state => ({
  isLoggedIn: !!state.user.id,
});

const mapDispatch = dispatch => ({
  handleClick() {
    dispatch(logout());
  },
});

export default connect(
  mapState,
  mapDispatch
)(NavBar);
