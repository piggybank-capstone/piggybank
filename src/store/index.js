import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import accounts from './accounts';
import transactions from './transactions';
// import cart from './cart';
// import orderHistory from './orderHistory';

const reducer = combineReducers({ accounts, transactions });
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from './accounts';
export * from './transactions';
// export * from './cart'
// export * from './orderHistory'
