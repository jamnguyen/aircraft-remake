import React from 'react';
import { GameProvider } from '../../context/game-provider';
import { SCREEN_NAME } from '../../reducers/screen-manager';
import { About, GameLounge, Login, MainMenu, Splash } from '../../screens';
import { useScreenManager } from '../../utils/hooks';

const Game = () => {
  const { screen } = useScreenManager();

  const renderScreen = () => {
    switch (screen) {
      case SCREEN_NAME.SPLASH:
        return <Splash />;
      case SCREEN_NAME.RENAME:
      case SCREEN_NAME.LOGIN:
        return <Login />;
      case SCREEN_NAME.MAIN_MENU:
        return <MainMenu />;
      case SCREEN_NAME.ABOUT:
        return <About />;
      case SCREEN_NAME.GAME_LOUNGE:
        return <GameLounge />;
      default:
        return null;
    }
  };

  return (
    <GameProvider>
      {renderScreen()}
    </GameProvider>
  );
};

export default Game;
