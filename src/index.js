import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import history from './history';
import * as serviceWorker from './serviceWorker';
import store from './store';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import App from './App';
import {
  MuiThemeProvider,
  createMuiTheme,
  withTheme
} from '@material-ui/core/styles';
import { teal, blue } from '@material-ui/core/colors';
import { colors } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: blue,
    textColor: colors.white
  },
  status: {
    danger: 'blue'
  },
  overrides: {
    MuiButton: {
      text: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 48,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)'
      }
    }
  },
  typography: { useNextVariants: true }
});

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <Router history={history}>
        <App />
      </Router>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
