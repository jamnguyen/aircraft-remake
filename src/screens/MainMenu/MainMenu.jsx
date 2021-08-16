import React from 'react';
import { Button } from '../../components';
import { setLoading } from '../../reducers/screen-manager';
import { useDispatch } from '../../utils/hooks';
import styles from './MainMenu.module.scss';

const MainMenu = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    setLoading(dispatch, false);
  }, []);

  return (
    <div className={styles.container}>
      <h1>Aircraft</h1>
      <Button
        className={styles.button}
      >Play</Button>
      <Button
        className={styles.button}
      >About</Button>
    </div>
  );
};

export default MainMenu;
