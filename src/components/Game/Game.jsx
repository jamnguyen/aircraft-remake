import React from 'react';
import { useScreenManager } from '../../reducers/hooks';
import { SCREEN_NAME } from '../../reducers/screen-manager';
import Login from '../Login/Login';
import MainMenu from '../MainMenu/MainMenu';
import Splash from '../Splash/Splash';

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
