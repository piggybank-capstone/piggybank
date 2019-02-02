import axios from 'axios';

//actions
const GOT_ALL_TRANSACTIONS = 'GOT_ALL_TRANSACTIONS';

export const gotAllTransactions = transactions => ({
  type: GOT_ALL_TRANSACTIONS,
  transactions,
});

export const getTransactions = () => async dispatch => {
  try {
    const { data } = await axios.get(`/api/plaid/transactions/get`);
    dispatch(gotAllTransactions(data));
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
