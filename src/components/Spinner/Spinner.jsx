import React from 'react';
import cx from 'classnames';
import { FaSpinner } from 'react-icons/fa';
import styles from './Spinner.module.scss';

const Spinner = ({ className, text }) => {
  return (
    <span
      className={cx(styles.container, className)}
    >
      <FaSpinner className={styles.icon} />
      {text && <span className={styles.text}>{text}</span>}
    </span>
  );
};

export default Spinner;
