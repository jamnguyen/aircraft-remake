import React from 'react';
import { FaArrowLeft, FaPlaneDeparture, FaRegFrown, FaRegMehRollingEyes } from 'react-icons/fa';
import { Button, Modal, Spinner } from '../../components';
import { SCREEN_NAME, setLoading, setScreen } from '../../reducers/screen-manager';
import { useDispatch } from '../../utils/hooks';
import styles from './GameLounge.module.scss';
import UserStatus from '../../constants/user-statuses';
import { useGame } from '../../context/game-provider';

const mockUsers = [
  // { id: '1', username: 'Jam Nguyen' },
  // { id: '2', username: 'Aki Huynh' },
  // { id: '3', username: 'Emma Stone Emma Stone Emma Stone Emma Stone' },
  // { id: '4', username: 'Aragaki Yui' },
];

const GameLounge = () => {
  const {
    availables: players,
    error,
    isHandshaking,
    updateUser,
    getUserId,
  } = useGame();
  const [shownModal, setShowModal] = React.useState(false);
  const [opponent, setOpponent] = React.useState();
  const dispatch = useDispatch();

  const availables = players.filter(user => user.id !== getUserId());

  React.useEffect(() => {
    setLoading(dispatch, false);
    updateUser({ status: UserStatus.AVAILABLE });
  }, []);

  const onBack = () => {
    setScreen(dispatch, SCREEN_NAME.MAIN_MENU);
    setLoading(dispatch, true);
  };

  const onOpponentSelect = (selectedUsername) => {
    setOpponent(selectedUsername);
    setShowModal(true);
  };

  const renderModalContent = () => {
    // @TODO: Get modal corresponding
    // Acceptance modal, Rejected modal, Timeout, Challenging modal

    // Acceptance modal
    // return (
    //   <div className={styles.modalContent}>
    //     <h2>Jam Nguyen challenges you for a game!</h2>
    //     <Button
    //       className={cx(styles.modalBtn, styles.safe)}
    //       onClick={() => setShowModal(false)}
    //     >
    //       Accept
    //     </Button>
    //     <Button
    //       className={styles.modalBtn}
    //       onClick={() => setShowModal(false)}
    //     >
    //       Reject
    //     </Button>
    //   </div>
    // );

    // Challenging modal
    return (
      <div className={styles.modalContent}>
        <h2>Challenging {opponent}...</h2>
        <Button
          className={styles.modalBtn}
          onClick={() => setShowModal(false)}
        >
          Cancel
        </Button>
      </div>
    );
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
          onClick={() => onOpponentSelect(item.username)}
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
