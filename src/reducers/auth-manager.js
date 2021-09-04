const ACTION__AUTH__SET_USERNAME = 'ACTION__AUTH__SET_USERNAME';
const ACTION__AUTH__UPDATE_USER = 'ACTION__AUTH__UPDATE_USER';

const userNameKey = 'aircraft_username';

const cachedName = localStorage.getItem(userNameKey) || '';

export const initialState = {
  id: null,
  username: cachedName,
};

export const updateUser = (dispatch, newValue) => {
  dispatch({ type: ACTION__AUTH__UPDATE_USER, payload: newValue });
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
    case ACTION__AUTH__UPDATE_USER:
      if (action.payload.username) {
        localStorage.setItem(userNameKey, action.payload.username);
      }

      return {
        ...state,
        ...action.payload,
      };
    default:
      return {
        ...state,
      }
  }
};
