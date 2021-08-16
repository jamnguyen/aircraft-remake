import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { Button, Input } from '../../components';
import { setUsername } from '../../reducers/game';
import { SCREEN_NAME, setLoading, setScreen } from '../../reducers/screen-manager';
import { useDispatch, useGame } from '../../utils/hooks';
import styles from './Login.module.scss';

const Login = () => {
  const { username } = useGame();
  const [name, setName] = React.useState('');
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (username) {
      setScreen(dispatch, SCREEN_NAME.MAIN_MENU);
    } else {
      setLoading(dispatch, false);
    }
  }, []);

  const onNext = () => {
    setUsername(dispatch, name);
    setLoading(dispatch, true);
    setScreen(dispatch, SCREEN_NAME.MAIN_MENU);
  }

  const onNameChange = (e) => {
    setName(e.target.value);
  }

  return (
    <div className={styles.container}>
      <h1>You are?</h1>
      <Input
        className={styles.input}
        autoFocus
        value={name}
        onChange={onNameChange}
      />
      <Button
        className={styles.button}
        onClick={onNext}
        disabled={!name}
      >Go <FaArrowRight className={styles.icon} /></Button>
    </div>
  );
};

export default Login;
