import { IRover } from '../Models/Interfaces';
import { EnumCardinalPoints } from '../Models/enums';

export function roverAxisFormatter(position: string) {
  const coords = position.split(' ');

  return `x${coords[0]}:y${coords[1]}`.trim();
}

export function prepareRoversData(rovers: IRover[]) {
  const tempData = {
    multiSteps: []
  };

  rovers.forEach((rover) => {
    const { rawFormat, position } = rover.lastKnownPosition;
    const axis = roverAxisFormatter(rawFormat);

    tempData[axis] = {
      axis,
      position,
      status: rover.status
    };

    tempData.multiSteps = [
      ...tempData.multiSteps,
      ...rover.stepsToNextPosition.steps
    ];
  });

  return tempData;
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

export function convertSourceInToCoords(
  position: string,
  step: string,
  outOfBoundaries: number
) {
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
