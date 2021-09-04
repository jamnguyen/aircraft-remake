import React from 'react';
import { initialState as authInitState, AuthReducer } from './auth-manager';
import { initialState as gameInitState, GameReducer } from './game';
import { initialState as screenInitState, ScreenReducer } from './screen-manager';

const combineReducers = (reducerObj) => (state, action) =>
  Object.keys(reducerObj).reduce(
    (acc, name) => ({
      ...acc,
      [name]: reducerObj[name](acc[name], action),
    }),
    state
  );

const initialState = {
  auth: authInitState,
  game: gameInitState,
  screen: screenInitState,
}

export const StoreContext = React.createContext();


const rootReducer = combineReducers({
  auth: AuthReducer,
  game: GameReducer,
  screen: ScreenReducer,
});

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(rootReducer, initialState);
  const value = React.useMemo(() => ([state, dispatch]), [state]);

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = React.useContext(StoreContext);
  if (context) {
    return context;
  } else {
    throw new Error('useStore must be used inside StoreProvider!');
  }
};
