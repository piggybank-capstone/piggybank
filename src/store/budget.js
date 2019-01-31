import axios from 'axios';

//action types
const GOT_ALL_BUDGETS = 'GET_ALL_BUDGETS';
const REMOVE_BUDGET = 'REMOVE_BUDGET';
const CREATE_OR_UPDATE_A_BUDGET = 'CREATE_OR_UPDATE_A_BUDGET';
const GET_CATEGORIES = 'GET_CATEGORIES';

export const gotAllBudgets = budgets => ({
  type: GOT_ALL_BUDGETS,
  budgets
});

export const removedBudget = budgetId => ({
  type: REMOVE_BUDGET,
  budgetId
});

export const createdOrUpdatedBudget = budget => ({
  type: CREATE_OR_UPDATE_A_BUDGET,
  budget
});

export const foundCategories = categories => ({
  type: GET_CATEGORIES,
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

export const removeBudget = id => async dispatch => {
  try {
    await axios.delete(`/api/budget/${id}`);

    dispatch(removedBudget(id));
  } catch (error) {
    console.error(error);
  }
};

export const createOrUpdateBudget = budget => async dispatch => {
  try {
    const res = await axios.post(`/api/budget/`, budget);
    console.log(res.data, 'BUDGET FOUND');
    dispatch(createdOrUpdatedBudget(res.data));
  } catch (error) {
    console.error(error);
  }
};

export const getCategories = () => async dispatch => {
  try {
    const res = await axios.get(`/api/budget/categories`);

    dispatch(foundCategories(res.data));
  } catch (error) {
    console.error(error);
  }
};

//reducer
export default function budgetsReducer(state = initialState, action) {
  switch (action.type) {
    case GOT_ALL_BUDGETS:
      return { ...state, budgetList: action.budgets };
    case REMOVE_BUDGET: {
      let newArr = [];
      state.budgetList.forEach(budget => {
        if (budget.id !== action.budgetId) {
          newArr.push(budget);
        }
      });

      return { ...state, budgetList: newArr };
    }
    case CREATE_OR_UPDATE_A_BUDGET: {
      let newArr = [];
      let isUpdate = false;
      state.budgetList.forEach(budget => {
        if (budget.id === action.budget.id) {
          const updatedBudget = { ...budget };
          updatedBudget.amount = action.budget.amount;
          isUpdate = true;
          newArr.push(updatedBudget);
        } else newArr.push(budget);
      });

      if (!isUpdate) {
        newArr.push(action.budget);
      }
      console.log(newArr, 'NEW ARR');
      return { ...state, budgetList: newArr };
    }

    case GET_CATEGORIES:
      return { ...state, categories: action.categories };
    default:
      return state;
  }
}
