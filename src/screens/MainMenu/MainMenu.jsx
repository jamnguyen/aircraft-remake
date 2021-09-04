import React from 'react';
import { Button } from '../../components';
import UserStatus from '../../constants/user-statuses';
import { useGame } from '../../context/game-provider';
import { SCREEN_NAME, setLoading, setScreen } from '../../reducers/screen-manager';
import { useDispatch, useAuth } from '../../utils/hooks';
import styles from './MainMenu.module.scss';

const MainMenu = () => {
  const { username } = useAuth();
  const { updateUser } = useGame();
  const dispatch = useDispatch();

  React.useEffect(() => {
    setLoading(dispatch, false);
    updateUser({ status: UserStatus.PENDING });
  }, []);

  const navigate = (screenName) => {
    setLoading(dispatch, true);
    setScreen(dispatch, screenName);
  };

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
        onClick={() => navigate(SCREEN_NAME.RENAME)}
      >Rename</Button>
      <Button
        className={styles.button}
        onClick={() => navigate(SCREEN_NAME.ABOUT)}
      >About</Button>
    </div>
  );
};

export default MainMenu;
