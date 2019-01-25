import Axios from 'axios';

//action types
const GOT_ALL_ACCOUNTS = 'GET_ALL_ACCOUNTS';
const GOT_ACCESS_TOKEN = 'GET_ACCESS_TOKEN';

export const gotAllAccounts = accounts => ({
  type: GOT_ALL_ACCOUNTS,
  accounts
});

export const gotAccessToken = account => ({
  type: GOT_ACCESS_TOKEN,
  account
});

//thunk to get data to front end
export const getAccounts = accounts => async dispatch => {
  try {
    // const res = await Axios.post(`/api/plaid/get_access`)
  } catch (error) {
    console.error(error);
  }
};

//reducer
export default function accountsReducer(accounts = [], action) {
  const accountsCopy = [...accounts];
  switch (action.type) {
    case GOT_ALL_ACCOUNTS:
      return [...accountsCopy, action.accounts];
    default:
      return accounts;
  }
}
