import React from 'react';
import { useDispatch } from '../../reducers/hooks';
import { SCREEN_NAME, setLoading, setScreen } from '../../reducers/screen-manager';
import styles from './Login.module.scss';

const Login = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    setLoading(dispatch, false);
  }, []);

  const onNext = () => {
    setLoading(dispatch, true);
    setScreen(dispatch, SCREEN_NAME.MAIN_MENU);
  }

  return (
    <div className={styles.container}>
      <h1>You are?</h1>
      <button onClick={onNext}>Next</button>
    </div>
  );
};

export default Login;
