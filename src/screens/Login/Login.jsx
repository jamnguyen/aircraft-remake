import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import * as AuthAPI from '../../api/auth';
import { Button, Input, Spinner } from '../../components';
import { useGame } from '../../context/game-provider';
import { setUsername } from '../../reducers/auth-manager';
import { SCREEN_NAME, setLoading, setScreen } from '../../reducers/screen-manager';
import { useAuth, useDispatch, useScreenManager } from '../../utils/hooks';
import styles from './Login.module.scss';

const Login = () => {
  const { username } = useAuth();
  const { connect, updateUser } = useGame();
  const { screen } = useScreenManager();
  const dispatch = useDispatch();
  const [name, setName] = React.useState(username);
  const [error, setError] = React.useState(null);
  const [isFetching, setIsFetching] = React.useState(false);

  React.useEffect(() => {
    setLoading(dispatch, false);
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    setIsFetching(true);
    AuthAPI.verifyUsername(name).then(() => {
      setUsername(dispatch, name);

      if (screen === SCREEN_NAME.LOGIN) {
        connect(name, next);
      } else {
        updateUser({ username: name });
        next();
      }
    }, error => {
      setIsFetching(false);
      setError(error);
    });
  };

  const next = () => {
    setLoading(dispatch, true);
    setScreen(dispatch, SCREEN_NAME.MAIN_MENU);
  };

  const onNameChange = (e) => {
    setError(null);
    setName(e.target.value);
  };

  const renderStatus = () => {
    if (isFetching) {
      return <Spinner className={styles.loader} />;
    } else if (error) {
      return (
        <div className={styles.error}>{error.message}</div>
      );
    }
    
    return (
      <Button
        className={styles.button}
        disabled={!name}
        type="submit"
      >Done <FaArrowRight className={styles.icon} /></Button>
    );
  }

  return (
    <form className={styles.container} onSubmit={onSubmit}>
      <h1>You are?</h1>
      <Input
        className={styles.input}
        autoFocus
        value={name}
        onChange={onNameChange}
        disabled={isFetching}
      />
      {renderStatus()}
    </form>
  );
};

export default Login;
