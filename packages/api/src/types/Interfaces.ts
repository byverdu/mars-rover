import * as mongoose from 'mongoose';
import { EnumCardinalPoints, EnumRoverStatus } from './enums';

export interface IPlateau extends mongoose.Document {
  uuid: string;
  name: string;
  size: IArea;
  rovers: IRover[];
}

export interface IRover extends mongoose.Document {
  uuid: string;
  uuidPlateau: string;
  lastKnownPosition: IRoverPosition;
  stepsToNextPosition: {
    steps: IRoverPosition[];
    source: string;
  };
  status: EnumRoverStatus;
  dateCreation: Date;
  modifiedAt: Date;
}

export interface IRoverPosition {
  axis: ICoords;
  position: EnumCardinalPoints;
}

export interface IArea {
  width: number;
  height: number;
}

export interface ICoords {
  x: number;
  y: number;
}
