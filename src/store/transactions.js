import axios from 'axios';

//actions
const GOT_ALL_TRANSACTIONS = 'GOT_ALL_TRANSACTIONS';

export const gotAllTransactions = transactions => ({
  type: GOT_ALL_TRANSACTIONS,
  transactions,
});

export const getTransactions = token => async dispatch => {
  try {
    const { data } = await axios.post(`/api/plaid/get_access_token`, {
      public_token: token,
    });
    dispatch(gotAllTransactions(data.transactions));
  } catch (error) {
    console.error(error);
  }
};

export default function transactionsReducer(transactions = [], action) {
  switch (action.type) {
    case GOT_ALL_TRANSACTIONS:
      return [...transactions, ...action.transactions];
    default:
      return transactions;
  }
}
