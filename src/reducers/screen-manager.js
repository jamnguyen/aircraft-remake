import { SCREEN_TRANSITION_DELAY } from "../app-config";

const ACTION__SCREEN__SET_SCREEN = 'ACTION__SCREEN__SET_SCREEN';
const ACTION__SCREEN__SET_LOADING = 'ACTION__LOADING__SET_SCREEN';

export const SCREEN_NAME = {
  SPLASH: 'SPLASH',
  LOGIN: 'LOGIN',
  RENAME: 'RENAME',
  MAIN_MENU: 'MAIN_MENU',
  ABOUT: 'ABOUT',

  // IN GAME
  GAME_LOUNGE: 'GAME_LOUNGE',
}

export const initialState = {
  isLoading: false,
  screen: SCREEN_NAME.LOGIN,
};

export const setScreen = (dispatch, screenName, delay = SCREEN_TRANSITION_DELAY) => {
  if (delay) {
    setTimeout(() => {
      dispatch({ type: ACTION__SCREEN__SET_SCREEN, payload: screenName });
    }, delay);
  } else {
    dispatch({ type: ACTION__SCREEN__SET_SCREEN, payload: screenName });
  }
};

export const setLoading = (dispatch, show) => {
  dispatch({ type: ACTION__SCREEN__SET_LOADING, payload: show });
};

export const ScreenReducer = (state, action) => {
  switch (action.type) {
    case ACTION__SCREEN__SET_SCREEN:
      return {
        ...state,
        screen: action.payload,
      }
    case ACTION__SCREEN__SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      }
    default:
      return {
        ...state,
      }
  }
};
