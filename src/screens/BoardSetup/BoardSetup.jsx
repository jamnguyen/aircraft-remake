import React from 'react';
import cx from 'classnames';
import { FaArrowLeft, FaPlaneDeparture, FaRegFrown, FaRegMehRollingEyes } from 'react-icons/fa';
import { Board, Button, Modal, Spinner } from '../../components';
import { SCREEN_NAME, setLoading, setScreen } from '../../reducers/screen-manager';
import { useDispatch } from '../../utils/hooks';
import styles from './BoardSetup.module.scss';
import UserStatus from '../../constants/user-statuses';
import { useGame } from '../../context/game-provider';
import Plane from '../../components/Plane/Plane';

const BoardSetup = () => {
  const {
    opponent
  } = useGame();
  const [shownModal, setShowModal] = React.useState(false);
  const dispatch = useDispatch();

  React.useEffect(() => {
    setLoading(dispatch, false);
  }, []);

  return (
    <div className={styles.container}>
      <h1>Battle Prepare</h1>
      <div className={styles.opponent}>vs. {opponent.username}</div>
      <Board className={styles.board}>
        <Plane />
      </Board>
    </div>
  );
};

export default BoardSetup;
