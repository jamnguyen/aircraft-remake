import React from 'react';
import cx from 'classnames';
import styles from './Input.module.scss';

const Input = ({ className, ...props }) => {
  return (
    <input
      className={cx(styles.input, className)}
      spellCheck="false"
      {...props}
    />
  );
};

export default Input;
