import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import * as AuthAPI from '../../api/auth';
import { Button, Input } from '../../components';
import { updateUser } from '../../reducers/auth-manager';
import { SCREEN_NAME, setLoading, setScreen } from '../../reducers/screen-manager';
import { useAuth, useDispatch, useScreenManager } from '../../utils/hooks';
import styles from './Login.module.scss';

const Login = () => {
  const { id, username } = useAuth();
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

    const apiFn = screen === SCREEN_NAME.LOGIN ? onLogin : onRename;
    setIsFetching(true);
    setError(null);
    apiFn().then(data => {
      updateUser(dispatch, data.data.user);
      setLoading(dispatch, true);
      setScreen(dispatch, SCREEN_NAME.MAIN_MENU);
    }, error => {
      setError(error);
    }).finally(() => {
      setIsFetching(false);
    });
  };

  const onLogin = () => {
    return AuthAPI.logIn(name);
  };

  const onRename = () => {
    return AuthAPI.updateUser(id, { username: name });
  };

  const onNameChange = (e) => {
    setName(e.target.value);
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
      {isFetching ? (
        <span>Loading...</span>
      ) : (
        <Button
          className={styles.button}
          disabled={!name}
          type="submit"
        >Done <FaArrowRight className={styles.icon} /></Button>
      )}
    </form>
  );
};

export default Login;
