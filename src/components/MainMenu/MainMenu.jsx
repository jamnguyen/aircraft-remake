import React from 'react';
import { useDispatch } from '../../reducers/hooks';
import { setLoading } from '../../reducers/screen-manager';
import styles from './MainMenu.module.scss';

const MainMenu = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    setLoading(dispatch, false);
  }, []);

  return (
    <div className={styles.container}>
      <h1>Main Menu</h1>
    </div>
  );
};

export default MainMenu;
