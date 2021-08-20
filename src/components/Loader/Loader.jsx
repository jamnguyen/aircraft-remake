import React from 'react';
import cx from 'classnames';
import styles from './Loader.module.scss';
import { SCREEN_TRANSITION_TIME } from '../../app-config';

const Loader = ({ show }) => {
  const [className, setClassName] = React.useState();
  const timer = React.useRef();

  React.useEffect(() => {
    if (show) {
      clearTimeout(timer);
      setClassName(styles.up);
    } else if (className) {
      timer.current = setTimeout(() => {
        setClassName(styles.upMore);
      }, SCREEN_TRANSITION_TIME);
    }
  }, [show]);

  return (
    <div className={cx(styles.container, className)}>
    </div>
  );
};

export default Loader;
