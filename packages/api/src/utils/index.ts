import { EnumCardinalPoints } from '../types/enums';

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

function convertSourceInToCoords(position: string, source: string) {
  const steps = source.split('');
  const currentPosition = position.split(' ');
  const tempCoords = {
    x: Number(currentPosition[0]),
    y: Number(currentPosition[1]),
    position: currentPosition[2]
  };

  return steps.map((step) => {
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

    return `${tempCoords.x} ${tempCoords.y} ${tempCoords.position}`;
  });
}

const utils = {
  convertSourceInToCoords
};

export default utils;
