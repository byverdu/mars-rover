import React from 'react';
import './PlateauSquare.scss';

const classnames = require('classnames');

export interface PlateauSquareProps {
  axis: string;
  empty: boolean;
}

const PlateauSquare: React.FC<PlateauSquareProps> = ({
  axis,
  empty,
  children
}) => (
  <div
    className={classnames('tile', { empty: empty, busy: !empty })}
    data-axis={axis}
  >
    {axis}
    {children}
  </div>
);

export default PlateauSquare;
