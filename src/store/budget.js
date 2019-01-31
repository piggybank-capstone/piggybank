import axios from 'axios';

//action types
const GOT_ALL_BUDGETS = 'GET_ALL_BUDGETS';
const REMOVE_BUDGET = 'REMOVE_BUDGET'


export const gotAllBudgets = budgets => ({
  type: GOT_ALL_BUDGETS,
  budgets,
});

export const removedBudget = budgetId => ({
  type: REMOVE_BUDGET,
  budgetId
});
/**
 * INITIAL STATE
 */
const initialState = {
  budgetList: []
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

export const removeBudget = (id) => async dispatch => {
  try {
    await axios.delete(`/api/budget/${id}`);

    dispatch(removedBudget(id));

  } catch (error) {
    console.error(error);
  }
};

//reducer
export default function budgetsReducer(state = initialState, action) {
  switch (action.type) {
    case GOT_ALL_BUDGETS:
      return { ...state, budgetList: action.budgets };
    case REMOVE_BUDGET:
      {
        let newArr = [];
        state.budgetList.forEach(budget => {
          if (budget.id !== action.budgetId) {
            newArr.push(budget);
          }
        })

        return { ...state, budgetList: newArr };
      }
    default:
      return state
  }
}
