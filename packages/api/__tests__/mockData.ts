import {v4} from 'uuid';
import Plateau from '../models/Plateau';
import Rover from '../models/Rover';
import {IRover, EnumCardinalPoints, EnumRoverStatus, IPlateau, IArea,} from '../models/Interfaces';

// Rover mock data
const uuid = v4();
const uuidPlateau = v4();
const lastKnownPosition: IRover['lastKnownPosition'] = {
  axis: {
    x: 0,
    y: 0
  },
  position: EnumCardinalPoints.N
};
const status: EnumRoverStatus = EnumRoverStatus.sleep 
const rover: IRover = new Rover({
  uuid,
  uuidPlateau,
  lastKnownPosition,
  status
});

const rover_2: IRover = new Rover({
  uuid: v4(),
  uuidPlateau,
  lastKnownPosition,
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
}


  export {
    roverData,
    plateauData
  }