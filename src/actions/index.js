export const saveEmail = (value) => ({ type: 'SAVE_EMAIL', value });

export const getApiData = (value) => ({ type: 'SUCCESS_FETCH', value });

export const addExpense = (value) => ({ type: 'ADD_EXPENSE', value });

export const removeExpense = (value) => ({ type: 'REMOVE_EXPENSE', value });

export const editExpense = (value) => ({ type: 'EDIT_EXPENSE', value });

export const endEditing = (value) => ({ type: 'END_EDITING', value });

export const fetchApi = () => (dispatch) => fetch('https://economia.awesomeapi.com.br/json/all').then((response) => response.json().then((json) => dispatch(getApiData(json))));
