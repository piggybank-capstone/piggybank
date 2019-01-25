//actions
const GOT_ALL_TRANSACTIONS = 'GOT_ALL_TRANSACTIONS';

export const gotAllTransactions = transactions => ({
  type: GOT_ALL_TRANSACTIONS,
  transactions
});

export const getTransactions = transactions => async dispatch => {
  try {
    // const res = await Axios.get(`/api/plaid/get_access`)
  } catch (error) {
    console.error(error);
  }
};

export default function transactionsReducer(transactions = [], action) {
  const transactionsCopy = [...transactions];
  switch (action.type) {
    case GOT_ALL_TRANSACTIONS:
      return [...transactionsCopy, action.transactions];
    default:
      return transactions;
  }
}
