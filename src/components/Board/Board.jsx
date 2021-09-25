import React from 'react';
import cx from 'classnames';
import styles from './Board.module.scss';

const Board = ({ className, children }) => {
  const cols = Array.from(Array(10).keys());

  return (
    <div
      className={cx(styles.container, className)}
    >
      <table>
        <tbody>
          {cols.map((i) => (
            <tr>
              {cols.map((i) => (
                <td />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {children}
    </div>
  );
};

export default Board;
