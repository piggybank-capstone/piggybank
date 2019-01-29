import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import history from './history';
import * as serviceWorker from './serviceWorker';
import store from './store';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import App from './App';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { colors } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    primary: colors.white,
    secondary: colors.blue,
    textColor: colors.white,
  },
  status: {
    danger: 'blue',
  },
  appBar: {
    background: colors.white,
  },
  overrides: {
    MuiButton: {
      text: {
        background: 'linear-gradient(45deg, #83EAF1 30%, #63A4FF 90%)',
        borderRadius: 3,
        border: 1,
        color: 'black',
        height: 40,
        padding: '10px 30px',
        margin: '10px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      },
    },
  },
  typography: { useNextVariants: true },
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
