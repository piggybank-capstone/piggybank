import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { auth } from '../store';
import { createGenerateClassName } from '@material-ui/core';

//material ui form components
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
import '../App.css';
import google_logo from '../styles/google_logo.png';
import TextField from '@material-ui/core/TextField';

/**
 * COMPONENT
 */

const styles = theme => ({
  main: {
    width: '70%',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: '60%',
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    [theme.breakpoints.down('sm')]: {
      width: '80%',
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
    // width: '90%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  submit: {
    // marginTop: theme.spacing.unit * 3
    // backgroundColor: 'green'
    float: 'right',
    [theme.breakpoints.down('sm')]: {
      width: '100%'
      // padding: '.7em'
    },
    [theme.breakpoints.between('sm', 'lg')]: {
      width: '30%'
    }
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
                  <TextField
                    required
                    id="firstName"
                    name="firstName"
                    label="First Name"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    autoComplete="given-name"
                    autoFocus
                  />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <TextField
                    required
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    autoComplete="family-name"
                    autoFocus
                  />
                </FormControl>
              </div>
            )}
            <FormControl margin="normal" required fullWidth>
              <TextField
                required
                id="email"
                label="Email"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                autoFocus
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <TextField
                required
                id="password"
                label="Password"
                type="password"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                autoComplete="current-password"
              />
            </FormControl>
            <Button
              type="submit"
              // variant="contained"
              // color="inherit"
              className={classes.submit}
            >
              {displayName}
            </Button>
            {error && error.response && (
              <div className="form-error"> {error.response.data} </div>
            )}
          </form>
          <Button href="/auth/google" className={classes.submit}>
            {displayName} with Google
            <img
              id="google_logo"
              src={google_logo}
              alt="google logo"
              height="20px"
            />
          </Button>
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
        const firstName = evt.target.firstName.value;
        const lastName = evt.target.lastName.value;
        dispatch(auth(email, password, formName, firstName, lastName));
      } else {
        dispatch(auth(email, password, formName));
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
