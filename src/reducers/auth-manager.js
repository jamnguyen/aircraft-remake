const ACTION__AUTH__SET_USERNAME = 'ACTION__AUTH__SET_USERNAME';

const userNameKey = 'aircraft_username';

const cachedName = localStorage.getItem(userNameKey) || '';

export const initialState = {
  username: cachedName,
};

export const setUsername = (dispatch, newValue) => {
  dispatch({ type: ACTION__AUTH__SET_USERNAME, payload: newValue });
};

export const AuthReducer = (state, action) => {
  switch (action.type) {
    case ACTION__AUTH__SET_USERNAME:
      localStorage.setItem(userNameKey, action.payload);

      return {
        ...state,
        username: action.payload,
      };
    default:
      return {
        ...state,
      }
  }
};
