import axios from 'axios';

//action types
const GOT_ALL_BUDGETS = 'GET_ALL_BUDGETS';
const REMOVE_BUDGET = 'REMOVE_BUDGET';
const CREATE_A_BUDGET = 'CREATE_A_BUDGET';
const GET_UNUSED_CATEGORY = 'GET_UNUSED_CATEGORY'


export const gotAllBudgets = budgets => ({
  type: GOT_ALL_BUDGETS,
  budgets,
});

export const removedBudget = budgetId => ({
  type: REMOVE_BUDGET,
  budgetId
});

export const createdBudget = budget => ({
  type: CREATE_A_BUDGET,
  budget
});

export const foundUnusedCategories = categories => ({
  type: GET_UNUSED_CATEGORY,
  categories
});
/**
 * INITIAL STATE
 */
const initialState = {
  budgetList: [],
  categories: []
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

export const createBudget = (budget) => async dispatch => {
  try {
    console.log(budget)
    const res = await axios.post(`/api/budget/`, budget);
    console.log(res.data);
    dispatch(createdBudget(res.data));

  } catch (error) {
    console.error(error);
  }
};

export const getUnusedCategories = () => async dispatch => {
  try {

    const res = await axios.get(`/api/budget/categories`);

    dispatch(foundUnusedCategories(res.data));

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
    case CREATE_A_BUDGET:
      return { ...state, budgetList: [...state.budgetList, action.budget] }
    case GET_UNUSED_CATEGORY:
      return { ...state, categories: action.categories }
    default:
      return state
  }
}
