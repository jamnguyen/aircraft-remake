import React from 'react';
import cx from 'classnames';
import { FaArrowLeft, FaPlaneDeparture, FaRegFrown, FaRegMehRollingEyes } from 'react-icons/fa';
import { Button, Modal, Spinner } from '../../components';
import { SCREEN_NAME, setLoading, setScreen } from '../../reducers/screen-manager';
import { useDispatch } from '../../utils/hooks';
import styles from './GameLounge.module.scss';
import UserStatus from '../../constants/user-statuses';
import { useGame } from '../../context/game-provider';

const GameLounge = () => {
  const {
    availables: players,
    error,
    isHandshaking,
    updateUser,
    getUserId,
    request,
    requestBattle,
    cancelRequest,
    acceptBattle,
    rejectBattle,
  } = useGame();
  const [shownModal, setShowModal] = React.useState(false);
  const dispatch = useDispatch();

  const availables = players.filter(user => user.id !== getUserId());

  React.useEffect(() => {
    setLoading(dispatch, false);
    updateUser({ status: UserStatus.AVAILABLE });
  }, []);

  React.useEffect(() => {
    if (request) {
      setShowModal(true);
    }
  }, [request]);

  const onBack = () => {
    setScreen(dispatch, SCREEN_NAME.MAIN_MENU);
    setLoading(dispatch, true);
  };

  const onOpponentSelect = (selectedPlayer) => {
    if (selectedPlayer.status !== UserStatus.AVAILABLE) {
      return;
    }

    // Request player for a battle
    requestBattle(selectedPlayer);
  };

  const renderModalContent = () => {
    if (!request) {
      return;
    }

    const { opponent, message } = request;

    if (!opponent) {
      return (
        <div className={styles.modalContent}>
          <h2>{message}</h2>
          <Button
            className={styles.modalBtn}
            onClick={() => setShowModal(false)}
          >
            Ok fine
          </Button>
        </div>
      );
    }

    if (opponent.status === UserStatus.AVAILABLE) {
      return (
        <div className={styles.modalContent}>
          <h2>{message}</h2>
          <Button
            className={styles.modalBtn}
            onClick={() => {
              cancelRequest();
              setShowModal(false);
            }}
          >
            Cancel
          </Button>
        </div>
      );
    }

    if (!opponent && message) {
      return (
        <div className={styles.modalContent}>
          <h2>{message}</h2>
          <Button
            className={styles.modalBtn}
            onClick={() => setShowModal(false)}
          >
            Ok fine
          </Button>
        </div>
      );
    }

    if (opponent.status === UserStatus.BATTLE_REQUEST) {
      return (
        <div className={styles.modalContent}>
          <h2>{message}</h2>
          <Button
            className={cx(styles.modalBtn, styles.safe)}
            onClick={acceptBattle}
          >
            Accept
          </Button>
          <Button
            className={styles.modalBtn}
            onClick={rejectBattle}
            onClick={() => {
              rejectBattle();
              setShowModal(false);
            }}
          >
            Reject
          </Button>
        </div>
      );
    }
  };

  const renderList = () => {
    if (error) {
      return (
        <li className={styles.error}>
          {error.message}
          <FaRegMehRollingEyes className={styles.iconSad} />
        </li>
      );
    } else if (isHandshaking) {
      return (
        <li className={styles.loader}>
          <Spinner text="Connecting to server..." />
        </li>
      );
    } else if (availables.length <= 0) {
      return (
        <li className={styles.empty}>
          No available player. <FaRegFrown className={styles.iconSad} />
        </li>
      );
    } else {
      return availables.map((item) => (
        <li
          tabIndex={shownModal ? '-1' : '0'}
          key={`user-${item.id}`}
          onClick={() => onOpponentSelect(item)}
          className={cx({ [styles.disabled]: item.status !== UserStatus.AVAILABLE })}
        >
          <span>{item.username}</span>
          <FaPlaneDeparture className={styles.icon} />
        </li>
      ));
    }
  };

  return (
    <div className={styles.container}>
      <h1>Lounge</h1>
      <ol className={styles.list}>
        {renderList()}
      </ol>
      <Button
        className={styles.button}
        onClick={onBack}
      ><FaArrowLeft className={styles.icon} />Back</Button>
      <Modal visible={shownModal}>
        {renderModalContent()}
      </Modal>
    </div>
  );
};

export default GameLounge;
