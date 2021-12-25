const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  data: {},
  isEditing: false,
  expenseBeingEdited: {},
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'SUCCESS_FETCH':
    return {
      ...state,
      data: action.value,
    };
  case 'ADD_EXPENSE':
    return {
      ...state,
      expenses: [
        ...state.expenses,
        { id: state.expenses.length, ...action.value },
      ],
    };
  case 'REMOVE_EXPENSE':
    return {
      ...state,
      expenses: state.expenses.filter(
        (expense) => expense.description !== action.value,
      ),
    };
  case 'EDIT_EXPENSE':
    return {
      ...state,
      isEditing: true,
      expenseBeingEdited: state.expenses.find(
        (expense) => expense.description === action.value,
      ),
    };
  case 'END_EDITING':
    return {
      ...state,
      expenses: state.expenses
        .map((expense) => (expense === state.expenseBeingEdited ? action.value : expense))
        .map(({ id, ...rest }, index) => ({ id: index, ...rest })),
      expenseBeingEdited: {},
      isEditing: false,
    };
  default:
    return state;
  }
};

export default walletReducer;
