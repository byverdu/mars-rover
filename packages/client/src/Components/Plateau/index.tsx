import React from 'react';
import './Plateau.scss';
import PlateauSquare from '../PlateauSquare';
import Rover from '../Rover';
import { IRover } from '../../Models/Interfaces';

function roverAxisFormatter(position: string) {
  const coords = position.split(' ');

  return `x${coords[0]}:y${coords[1]}`.trim();
}

function gridBuilder(width: number, height: number, rovers: IRover[]) {
  const wrapper = [];
  const rover: IRover = rovers[0];
  const { rawFormat, position } = rover.lastKnownPosition;
  const nextStepsFormatted = rover.stepsToNextPosition.steps.map((step) =>
    roverAxisFormatter(step)
  );

  function rowBuilder(newHeight) {
    for (let i = 0; i < width; i += 1) {
      const axis = `x${i}:y${height - newHeight}`;
      const roverAxisPos = roverAxisFormatter(rawFormat);
      // console.log(nextStepsFormatted, roverAxisPos)
      const isBusy = axis !== roverAxisPos;
      const willBeBusy = nextStepsFormatted.indexOf(axis) !== -1;

      wrapper.push(
        <PlateauSquare
          willBeBusy={willBeBusy}
          key={axis}
          axis={axis}
          empty={isBusy}
        >
          {!isBusy && (
            <Rover
              axis={roverAxisPos}
              direction={position}
              status={rover.status}
            />
          )}
          {willBeBusy && <div>Will be busy</div>}
        </PlateauSquare>
      );
    }
  }
  let counter = 1;
  while (counter <= width) {
    rowBuilder(counter);
    counter += 1;
  }

  // console.log(wrapper, 'Plateau.scss');

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
