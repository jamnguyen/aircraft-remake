import React from 'react';
import cx from 'classnames';
import styles from './Button.module.scss';

const Button = ({ className, children, ...props }) => {
  return (
    <button
      className={cx(styles.button, className)}
      {...props}
    >{children}</button>
  );
};

export default Button;
