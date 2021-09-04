const ACTION__GAME__SET_USERNAME = 'ACTION__GAME__SET_USERNAME';

const userNameKey = 'aircraft_username';

const cachedName = localStorage.getItem(userNameKey) || '';

export const initialState = {
  username: cachedName,
};

export const GameReducer = (state, action) => {
  switch (action.type) {
    default:
      return {
        ...state,
      }
  }
};
