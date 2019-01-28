import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../store';
import { NavLink } from 'react-router-dom';

const NavBar = props => {
  const { isLoggedIn, handleClick } = props;
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <NavLink to={'/home'}>
            <Typography variant="title" color="inherit">
              piggybank
            </Typography>
          </NavLink>
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
          <NavLink to={'/trends'}>Trends</NavLink>
        </Toolbar>
      </AppBar>
    </div>
  );
};

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
