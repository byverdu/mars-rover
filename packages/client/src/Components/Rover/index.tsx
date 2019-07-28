import React from 'react';
import './Rover.scss';
import {
  EnumCardinalPoints,
  EnumRoverStatus,
  EnumRotation
} from '../../Models/enums';

const classnames = require('classnames');

export interface RoverProps {
  axis: string;
  direction: EnumCardinalPoints;
  status: EnumRoverStatus;
}

const Rover: React.FC<RoverProps> = ({ axis, direction, status }) => (
  <div
    className={classnames('rover', status, EnumRotation[direction])}
    data-axis={axis}
    data-direction={direction}
  >
    <img
      className="rover-image"
      src="https://cdn-jr.brainpop.com/image_library/240000/240204_256x256.png"
      alt="mars rover"
    />
  </div>
);

export default Rover;
