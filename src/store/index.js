import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import accounts from './accounts';
import transactions from './transactions';
import user from './user';
import { throttle } from 'lodash';
import budget from './budget';

import { loadState, saveState } from './localStorage';

const persistedState = loadState();

const reducer = combineReducers({ accounts, transactions, user, budget });
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, persistedState, middleware);

store.subscribe(
  throttle(() => {
    //this gets entire store, we can get specific object
    saveState(store.getState());
    //accounts: store.getState().accounts
  }, 1000)
);

export default store;
export * from './accounts';
export * from './transactions';
export * from './user';
