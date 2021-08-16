import React from 'react';
import { APP_NAME, SPLASH_TIME } from '../../app-config';
import { SCREEN_NAME, setLoading, setScreen } from '../../reducers/screen-manager';
import { useDispatch } from '../../utils/hooks';
import styles from './Splash.module.scss';

const Splash = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    setTimeout(() => {
      setLoading(dispatch, true);
      setScreen(dispatch, SCREEN_NAME.LOGIN);
    }, SPLASH_TIME);
  }, []);
  
  return (
    <div className={styles.container}>
      <h1>{ APP_NAME }</h1>
    </div>
  );
};

export default Splash;
