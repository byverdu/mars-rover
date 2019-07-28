import React from 'react';
import './PlateauSquare.scss';

const classnames = require('classnames');

export interface PlateauSquareProps {
  axis: string;
  empty: boolean;
  willBeBusy: boolean;
}

const PlateauSquare: React.FC<PlateauSquareProps> = ({
  axis,
  empty,
  willBeBusy,
  children
}) => (
  <div
    className={classnames('tile', {
      ['will-be-busy']: willBeBusy,
      busy: !empty
    })}
    data-axis={axis}
  >
    {axis}
    {children}
  </div>
);

export default PlateauSquare;
