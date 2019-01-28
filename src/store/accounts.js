import axios from 'axios';

//action types
const GOT_ALL_ACCOUNTS = 'GET_ALL_ACCOUNTS';
const GOT_ACCESS_TOKEN = 'GET_ACCESS_TOKEN';

export const gotAllAccounts = accounts => ({
  type: GOT_ALL_ACCOUNTS,
  accounts,
});

export const gotAccessToken = account => ({
  type: GOT_ACCESS_TOKEN,
  account,
});

//thunk to get account data from plaid api using public token
export const getAccounts = token => async dispatch => {
  try {
    const { data } = await axios.post(`/api/plaid/get_access_token`, {
      public_token: token,
    });
    dispatch(gotAllAccounts(data.accounts));
  } catch (error) {
    console.error(error);
  }
};

//reducer
export default function accountsReducer(accounts = [], action) {
  switch (action.type) {
    case GOT_ALL_ACCOUNTS:
      return [...accounts, ...action.accounts];
    default:
      return accounts;
  }
}
