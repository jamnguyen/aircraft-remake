const ACTION__SCREEN__SET_USERNAME = 'ACTION__SCREEN__SET_USERNAME';

const userNameKey = 'aircraft_username';

const cachedName = localStorage.getItem(userNameKey) || '';

export const initialState = {
  username: cachedName,
};

export const setUsername = (dispatch, newValue) => {
  dispatch({ type: ACTION__SCREEN__SET_USERNAME, payload: newValue });
};

export const GameReducer = (state, action) => {
  switch (action.type) {
    case ACTION__SCREEN__SET_USERNAME:
      localStorage.setItem(userNameKey, action.payload);

      return {
        ...state,
        username: action.payload,
      }
    default:
      return {
        ...state,
      }
  }
};
