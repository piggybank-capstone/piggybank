import axios from 'axios';

//action types
const GOT_ALL_ACCOUNTS = 'GET_ALL_ACCOUNTS';
const GOT_ACCESS_TOKEN = 'GET_ACCESS_TOKEN';
const LOADING_ALL_ACCOUNTS = 'LOADING_ALL_ACCOUNTS';

export const gotAllAccounts = accounts => ({
  type: GOT_ALL_ACCOUNTS,
  accounts,
});

export const gotAccessToken = account => ({
  type: GOT_ACCESS_TOKEN,
  account,
});

const loadingAllAccounts = () => ({
  type: LOADING_ALL_ACCOUNTS,
  isLoading: true,
});

//thunk to get account data from plaid api using public token
export const getAccounts = () => async dispatch => {
  try {
    dispatch(loadingAllAccounts());
    const { data } = await axios.get(`/api/plaid/accounts/get`);
    dispatch(gotAllAccounts(data));
  } catch (error) {
    console.error(error);
  }
};

const initialState = {
  accounts: [],
  isLoading: false,
};

//reducer
export default function accountsReducer(state = initialState, action) {
  const newState = { ...state };
  switch (action.type) {
    case LOADING_ALL_ACCOUNTS:
      newState.isLoading = action.isLoading;
      return newState;
    case GOT_ALL_ACCOUNTS:
      newState.accounts = [...state.accounts, ...action.accounts];
      newState.isLoading = false;
      return newState;
    default:
      return state;
  }
}
