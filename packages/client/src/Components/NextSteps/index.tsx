import React, { useState, memo } from 'react';
import './NextSteps.scss';
import { EnumsSteps, EnumCardinalPoints } from '../../Models/enums';

export interface NextStepsProps {
  setRoverNextSteps: (value: string) => void;
  initialPosition: string;
  outOfBoundaries: number;
}

const possibleDirections = {
  N: {
    L: EnumCardinalPoints.W,
    R: EnumCardinalPoints.E
  },
  E: {
    L: EnumCardinalPoints.N,
    R: EnumCardinalPoints.S
  },
  S: {
    L: EnumCardinalPoints.E,
    R: EnumCardinalPoints.W
  },
  W: {
    L: EnumCardinalPoints.S,
    R: EnumCardinalPoints.N
  }
};

function convertSourceInToCoords(position: string, step: string, outOfBoundaries: number) {
  const currentPosition = position.split(' ');
  const tempCoords = {
    x: Number(currentPosition[0]),
    y: Number(currentPosition[1]),
    position: currentPosition[2]
  };

  switch (step) {
    case 'L':
      tempCoords.position = possibleDirections[tempCoords.position]['L'];
      break;

    case 'R':
      tempCoords.position = possibleDirections[tempCoords.position]['R'];
      break;

    case 'M':
      if (tempCoords.position === 'N') {
        tempCoords.y = tempCoords.y + 1;
      }
      if (tempCoords.position === 'S') {
        tempCoords.y = tempCoords.y - 1;
      }
      if (tempCoords.position === 'E') {
        tempCoords.x = tempCoords.x + 1;
      }
      if (tempCoords.position === 'W') {
        tempCoords.x = tempCoords.x - 1;
      }
      break;
    default:
      break;
  }

  if (
    tempCoords.x === -1 ||
    tempCoords.x === outOfBoundaries ||    
    tempCoords.y === -1 ||
    tempCoords.y === outOfBoundaries
  ) {
    return null;
  }

  return `${tempCoords.x} ${tempCoords.y} ${tempCoords.position}`;
}

const NextSteps: React.FC<NextStepsProps> = ({ setRoverNextSteps, initialPosition, outOfBoundaries }) => {
  const [steps, setSteps] = useState('');
  const [nextPosition, setNextPosition] = useState(initialPosition);

  console.log(initialPosition, 'NextSteps');

  return (
    <div>
      <h5>Set Rover Next Steps</h5>
      {steps}
      {[EnumsSteps.L, EnumsSteps.M, EnumsSteps.R].map((step) => {
        return (
          <button
            data-step={step}
            onClick={(e: React.MouseEvent) => {
              const elementText = (e.target as HTMLButtonElement).textContent;
              const newText = steps.concat(elementText);
              const x = nextPosition.length !== 0 ? nextPosition : initialPosition;
              const xoxo = convertSourceInToCoords(x, elementText, outOfBoundaries)
              setNextPosition(xoxo);
              const isMoveForwardOutOfBoundaries = convertSourceInToCoords(xoxo, 'M', outOfBoundaries);

              (document.querySelector('[data-step="M"]') as HTMLButtonElement).disabled = isMoveForwardOutOfBoundaries === null;

              setSteps(newText);
              setRoverNextSteps(newText);
            }}
          >
            {step}
          </button>
        );
      })}
    </div>
  );
};

export default memo(NextSteps);
