import { v4 } from 'uuid';
import Plateau from '../src/models/Plateau';
import Rover from '../src/models/Rover';
import { IRover, IPlateau, IArea, IRoverPosition } from '../src/types/Interfaces';

import { EnumCardinalPoints, EnumRoverStatus } from '../src/types/enums';

// Rover mock data
const uuid = v4();
const uuidPlateau = v4();
const lastKnownPosition: IRoverPosition = {
  axis: {
    x: 0,
    y: 0
  },
  position: EnumCardinalPoints.N
};
const stepsToNextPosition = {
  steps: [{axis: {x: 1, y: 1}, position: EnumCardinalPoints.N}],
  source: 'RMLM'
}
const status: EnumRoverStatus = EnumRoverStatus.sleep;
const rover: IRover = new Rover({
  uuid,
  uuidPlateau,
  lastKnownPosition,
  stepsToNextPosition,
  status
});

const rover_2: IRover = new Rover({
  uuid: v4(),
  uuidPlateau,
  lastKnownPosition,
  stepsToNextPosition,
  status
});

const roverData = {
  rover,
  uuid,
  uuidPlateau,
  lastKnownPosition,
  status
};

// Plateau mock data
const name = 'mars';
const size: IArea = {
  width: 5,
  height: 5
};
const rovers = [rover, rover_2];
const plateau: IPlateau = new Plateau({
  uuid,
  name,
  size,
  rovers
});

const plateauData = {
  plateau,
  uuid,
  name,
  size,
  rovers
};

// Controllers

const plateauPayloadData = {
  plateauSize: {
    width: 5,
    height: 5
  },
  rovers: {
    0: {
      axis: {
        x: 1,
        y: 1
      },
      position: 'N',
      moveSequence: 'LMRM'
    },
    1: {
      axis: {
        x: 2,
        y: 2
      },
      position: 'N',
      moveSequence: 'LMLMLM'
    }
  }
};

export { roverData, plateauData, plateauPayloadData };
