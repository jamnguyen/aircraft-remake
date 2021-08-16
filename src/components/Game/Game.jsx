import React from 'react';
import { SCREEN_NAME } from '../../reducers/screen-manager';
import { Login, MainMenu, Splash } from '../../screens';
import { useScreenManager } from '../../utils/hooks';

const Game = () => {
  const { screen } = useScreenManager();
  switch (screen) {
    case SCREEN_NAME.SPLASH:
      return <Splash />;
    case SCREEN_NAME.LOGIN:
      return <Login />;
    case SCREEN_NAME.MAIN_MENU:
      return <MainMenu />;
    default:
      return null;
  }
};

export default Game;
