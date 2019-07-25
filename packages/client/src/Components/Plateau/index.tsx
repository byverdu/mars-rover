import React from 'react';
import './Plateau.scss';
import PlateauSquare from '../PlateauSquare';
import Rover from '../Rover';
import { IRoverPosition, IRover } from '../../Models/Interfaces';

function gridBuilder(width: number, height: number, rovers: IRover[]) {
  const wrapper = [];
  const rover: IRover = rovers[0];
  const {
    axis: { x, y },
    position
  } = rover.lastKnownPosition;
  function rowBuilder(newHeight) {
    for (let i = 0; i < width; i += 1) {
      const axis = `x${i}:y${height - newHeight}`;
      const roverAxisPos = `x${x}:y${y}`;
      const isEmpty = axis !== roverAxisPos;

      wrapper.push(
        <PlateauSquare key={axis} axis={axis} empty={isEmpty}>
          {!isEmpty && (
            <Rover
              axis={roverAxisPos}
              direction={position}
              status={rover.status}
            />
          )}
        </PlateauSquare>
      );
    }
  }
  let counter = 1;
  while (counter <= width) {
    rowBuilder(counter);
    counter += 1;
  }

  console.log(wrapper, 'Plateau.scss');

  return wrapper;
}

export interface PlateauProps {
  width: number;
  height: number;
  rovers: IRover[];
}

const Plateau: React.FC<PlateauProps> = ({ width, height, rovers }) => (
  <section className="plateau" style={{ width: `${width * 100}px` }}>
    {gridBuilder(width, height, rovers)}
  </section>
);

export default Plateau;
