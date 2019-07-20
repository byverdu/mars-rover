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
  lastKnownPosition: {
    axis: ICoords;
    position: EnumCardinalPoints;
  };
  status: EnumRoverStatus;
  dateCreation: Date;
  modifiedAt: Date;
}

export interface IArea {
  width: number;
  height: number;
}

export interface ICoords {
  x: number;
  y: number;
}