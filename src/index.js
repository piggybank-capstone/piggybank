import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import history from './history';
import * as serviceWorker from './serviceWorker';
import store from './store';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import App from './App';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { theme } from './styles/muiTheme.js';

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
