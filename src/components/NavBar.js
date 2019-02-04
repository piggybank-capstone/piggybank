import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { logout } from '../store';
import { NavLink, Link } from 'react-router-dom';
import Rectangle_Logo from '../styles/Rectangle_Logo.png';
// import { withStyles } from '@material-ui/core/styles';
// import  from '@material-ui/core/colors';

// const styles = theme => ({
//   root: {
//     padding: theme.spacing.unit,
//     [theme.breakpoints.down('sm')]: {
//       backgroundColor: 'green'
//     },
//     [theme.breakpoints.down('xs')]: {
//       backgroundColor: 'blue'
//     },
//     [theme.breakpoints.up('lg')]: {
//       backgroundColor: theme.palette.secondary.main
//     }
//   }
// });

class NavBar extends Component {
  render() {
    const { isLoggedIn, handleClick } = this.props;
    return (
      <Toolbar>
        <div id="nav">
          <NavLink to={'/'}>
            <img
              id="logo"
              src={Rectangle_Logo}
              height="40"
              alt="piggybank logo"
            />
          </NavLink>
          <div id="nav-right">
            {isLoggedIn ? (
              <div>
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

// const WrappedNavBar = withStyles(styles)(NavBar);

export default connect(
  mapState,
  mapDispatch
)(NavBar);
