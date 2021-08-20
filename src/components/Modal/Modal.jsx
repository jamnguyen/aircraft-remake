import React from 'react';
import cx from 'classnames';
import styles from './Modal.module.scss';

const Modal = ({ visible, className, children }) => {
  return (
    <div
      className={cx(styles.container, visible && styles.visible)}
    >
      <div className={cx(styles.modal, className)}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
