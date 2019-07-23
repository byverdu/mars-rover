import { EnumCardinalPoints, EnumRoverStatus } from './enums';

export interface IPlateau {
  uuid: string;
  name: string;
  size: IArea;
  rovers: IRover[];
}

export interface IRover {
  uuid: string;
  uuidPlateau: string;
  lastKnownPosition: IRoverPosition;
  newPosition: IRoverPosition;
  stepsToNextPosition: {
    steps: string[];
    source: string;
  };
  status: EnumRoverStatus;
  dateCreation?: Date;
  modifiedAt?: Date;
}

export interface IRoverPosition {
  axis: ICoords;
  position: EnumCardinalPoints;
  rawFormat: string;
}

export interface IArea {
  width: number;
  height: number;
}

export interface ICoords {
  x: number;
  y: number;
}

export interface IRoverPositionPayload {
  steps: string;
  position: string;
}

export interface IPlateauPayload {
  plateauSize: string;
  rovers: IRoverPositionPayload[]
}
