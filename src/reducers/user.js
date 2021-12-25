const INITIAL_STATE = {
  email: '',
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'SAVE_EMAIL':
    return {
      ...state,
      email: action.value,
    };
  default:
    return state;
  }
};

export default userReducer;
