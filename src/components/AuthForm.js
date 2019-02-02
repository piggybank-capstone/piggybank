import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { auth } from '../store';
import { createGenerateClassName } from '@material-ui/core';

//material ui form components
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

/**
 * COMPONENT
 */

const styles = theme => ({
  main: {
    width: '45%',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    backgroundColor: 'transparent'
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
    // backgroundColor: 'green'
    float: 'right',
    padding: '.7em 1.5em'
  },
  center: {
    textAlign: 'center'
  }
});

const AuthForm = props => {
  const { name, displayName, handleSubmit, error } = props;
  const { classes } = props;

  return (
    <div className="login-new">
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={createGenerateClassName.paper}>
          <Typography component="h1" variant="h5" className={classes.center}>
            {displayName}
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit} name={name}>
            {name === 'signup' && (
              <div>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="firstName">First Name</InputLabel>
                  <Input id="firstName" name="firstName" autoComplete="given-name" autoFocus />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="lastName">Last Name</InputLabel>
                  <Input id="lastName" name="lastName" autoComplete="family-name" autoFocus />
                </FormControl>
              </div>
            )}
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input id="email" name="email" autoComplete="email" autoFocus />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                name="password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </FormControl>
            <Button
              type="submit"
              variant="contained"
              color="inherit"
              className={classes.submit}
            >
              {displayName}
            </Button>
            {error && error.response && (
              <div className="form-error"> {error.response.data} </div>
            )}
          </form>
          <a href="/auth/google">
            {displayName} with Google
          </a>
        </Paper>
      </main>
    </div>
  );
};

const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  };
};

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  };
};

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const email = evt.target.email.value;
      const password = evt.target.password.value;
      if (formName === 'signup') {
        const firstName = evt.target.firstName.value
        const lastName = evt.target.lastName.value
        dispatch(auth(email, password, formName, firstName, lastName))
      } else {
        dispatch(auth(email, password, formName))
      }
    }
  };
};

export const Login = connect(
  mapLogin,
  mapDispatch
)(withStyles(styles)(AuthForm));
export const Signup = connect(
  mapSignup,
  mapDispatch
)(withStyles(styles)(AuthForm));

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
};
