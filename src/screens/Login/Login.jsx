import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { Button, Input } from '../../components';
import { setUsername } from '../../reducers/game';
import { SCREEN_NAME, setLoading, setScreen } from '../../reducers/screen-manager';
import { useDispatch, useGame, useScreenManager } from '../../utils/hooks';
import styles from './Login.module.scss';

const Login = () => {
  const { username } = useGame();
  const { screen } = useScreenManager();
  const [name, setName] = React.useState(username);
  const dispatch = useDispatch();

  React.useEffect(() => {
    console.log('HMMMM', username, screen);
    if (username && screen === SCREEN_NAME.LOGIN) {
      setScreen(dispatch, SCREEN_NAME.MAIN_MENU);
    } else {
      setLoading(dispatch, false);
    }
  }, []);

  const onNext = (e) => {
    e.preventDefault();
    setUsername(dispatch, name);
    setLoading(dispatch, true);
    setScreen(dispatch, SCREEN_NAME.MAIN_MENU);
  }

  const onNameChange = (e) => {
    setName(e.target.value);
  }

  return (
    <form className={styles.container} onSubmit={onNext}>
      <h1>You are?</h1>
      <Input
        className={styles.input}
        autoFocus
        value={name}
        onChange={onNameChange}
      />
      <Button
        className={styles.button}
        disabled={!name}
        type="submit"
      >Done <FaArrowRight className={styles.icon} /></Button>
    </form>
  );
};

export default Login;
