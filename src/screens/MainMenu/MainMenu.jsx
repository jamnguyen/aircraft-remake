import React from 'react';
import { Button } from '../../components';
import { SCREEN_NAME, setLoading, setScreen } from '../../reducers/screen-manager';
import { useDispatch, useGame } from '../../utils/hooks';
import styles from './MainMenu.module.scss';

const MainMenu = () => {
  const { username } = useGame();
  const dispatch = useDispatch();

  React.useEffect(() => {
    setLoading(dispatch, false);
  }, []);

  const navigate = (screenName) => {
    setLoading(dispatch, true);
    setScreen(dispatch, screenName);
  }

  return (
    <div className={styles.container}>
      <h1>Aircraft</h1>
      <div
        className={styles.play}
      >
        <Button
          className={styles.button}
          onClick={() => navigate(SCREEN_NAME.GAME_LOUNGE)}
        >Play</Button>
        <p>as {username}</p>
      </div>
      <Button
        className={styles.button}
        onClick={() => navigate(SCREEN_NAME.CHANGE_NAME)}
      >Change name</Button>
      <Button
        className={styles.button}
        onClick={() => navigate(SCREEN_NAME.ABOUT)}
      >About</Button>
    </div>
  );
};

export default MainMenu;
