import axios from 'axios';

//action types
const GOT_ALL_BUDGETS = 'GET_ALL_BUDGETS';


export const gotAllBudgets = budgets => ({
  type: GOT_ALL_BUDGETS,
  budgets,
});

/**
 * INITIAL STATE
 */
const initialState = {
  budgetList: {}
};

//thunk to get account data from plaid api using public token
export const getBudgets = () => async dispatch => {
  try {
    const { data } = await axios.get(`/api/budget`);

    dispatch(gotAllBudgets(data));

  } catch (error) {
    console.error(error);
  }
};

//reducer
export default function budgetsReducer(state = initialState, action) {
  switch (action.type) {
    case GOT_ALL_BUDGETS:
      return { ...state, budgetList: action.budgets };
    default:
      return state
  }
}
