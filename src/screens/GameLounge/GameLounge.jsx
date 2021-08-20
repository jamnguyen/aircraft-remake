import React from 'react';
import cx from 'classnames';
import { FaArrowLeft, FaPlaneDeparture } from 'react-icons/fa';
import { Button, Modal } from '../../components';
import { SCREEN_NAME, setLoading, setScreen } from '../../reducers/screen-manager';
import { useDispatch } from '../../utils/hooks';
import styles from './GameLounge.module.scss';

const mockUsers = [
  { id: '1', username: 'Jam Nguyen' },
  { id: '2', username: 'Aki Huynh' },
  { id: '3', username: 'Emma Stone Emma Stone Emma Stone Emma Stone' },
  { id: '4', username: 'Aragaki Yui' },
];

const GameLounge = () => {
  const [ shownModal, setShowModal ] = React.useState(false);
  const [ opponent, setOpponent ] = React.useState();
  const dispatch = useDispatch();

  React.useEffect(() => {
    setLoading(dispatch, false);
  }, []);

  const onBack = () => {
    setScreen(dispatch, SCREEN_NAME.MAIN_MENU);
    setLoading(dispatch, true);
  }

  const onOpponentSelect = (selectedUsername) => {
    setOpponent(selectedUsername);
    setShowModal(true);
  }

  const getModalContent = () => {
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
  }

  return (
    <div className={styles.container}>
      <h1>Available Player</h1>
      <ol className={styles.list}>
        {mockUsers.map((item) => (
          <li
            tabIndex={shownModal ? '-1' : '0'}
            key={`user-${item.id}`}
            onClick={() => onOpponentSelect(item.username)}
          >
            <span>{item.username}</span>
            <FaPlaneDeparture className={styles.icon} />
          </li>
        ))}
      </ol>
      <Button
        className={styles.button}
        onClick={onBack}
      ><FaArrowLeft className={styles.icon} />Back</Button>
      <Modal visible={shownModal}>
        {getModalContent()}
      </Modal>
    </div>
  );
};

export default GameLounge;
