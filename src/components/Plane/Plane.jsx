import React from 'react';
import cx from 'classnames';
import styles from './Plane.module.scss';

export const PLANE_DIRECTION = {
  UP: 'up',
  DOWN: 'down',
  LEFT: 'left',
  RIGHT: 'right',
};

const CELL_TYPE = {
  T: 'top',
  R: 'right',
  B: 'bottom',
  L: 'left',
  T_L: 'topLeft',
  T_R: 'topRight',
  T_B: 'topBottom',
  L_R: 'leftRight',
  L_B: 'leftBottom',
  R_B: 'rightBottom',
  T_R_B: 'topRightBottom',
  R_B_L: 'rightBottomLeft',
  B_L_T: 'bottomLeftTop',
  L_T_R: 'leftTopRight',
  FULL: 'full',
}

const CELL_MAP = {
  [PLANE_DIRECTION.UP]: [
    0, 0, CELL_TYPE.L_T_R, 0, 0,
    CELL_TYPE.B_L_T, CELL_TYPE.T_B, CELL_TYPE.L_R, CELL_TYPE.T_B, CELL_TYPE.T_R_B,
    0, 0, CELL_TYPE.L_R, 0, 0,
    0, CELL_TYPE.B_L_T, CELL_TYPE.B, CELL_TYPE.T_R_B, 0,
    0, 0, 0, 0, 0,
  ],
};

const PLANE_SIZE = 5;

const Plane = ({ className, data }) => {
  const {
    x,
    y,
    direction,
    isDead
  } = {
    x: 3,
    y: 3,
    direction: PLANE_DIRECTION.UP,
    isDead: false
  };

  const drawCells = () => {
    const cells = CELL_MAP[direction];
  
    return cells.map((drawType, index) => {
      if (!drawType) {
        return null;
      }

      const colIndex = index % PLANE_SIZE;
      const rowIndex = parseInt(index / PLANE_SIZE);

      return (
        <span
          key={`plane-cell-${x}-${y}-${index}`}
          className={cx(styles.cell, styles[drawType])}
          style={{
            left: `${colIndex * 2}0%`,
            top: `${rowIndex * 2}0%`,
          }}
        />
      )
    });
  };

  return (
    <div
      className={cx(styles.container, className)}
      style={{
        left: `${x}0%`,
        top: `${y}0%`,
        height: `${PLANE_SIZE}0%`,
        width: `${PLANE_SIZE}0%`,
      }}
    >
      {drawCells()}
    </div>
  );
};

export default Plane;
