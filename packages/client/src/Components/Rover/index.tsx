import React from 'react';
import './Rover.scss';
import { EnumCardinalPoints, EnumRoverStatus } from '../../Models/enums';

const classnames = require('classnames');

export interface RoverProps {
  axis: string;
  direction: EnumCardinalPoints;
  status: EnumRoverStatus;
};

const Rover: React.FC<RoverProps> = ({axis, direction, status}) => (
  <div
    className={classnames('rover', status)}
    data-axis={axis}
    data-direction={direction}
  />
);

export default Rover
