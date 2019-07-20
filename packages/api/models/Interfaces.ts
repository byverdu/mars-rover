import * as mongoose from 'mongoose';

export interface IPlateau extends mongoose.Document {
  uuid: string;
  name: string;
  size: IArea;
}

export interface IRover extends mongoose.Document {
  uuid: string;
  lastKnownPosition: {
    axis: ICoords,
    position: EnumCardinalPoints
  };
  status: EnumRoverStatus;
  dateCreation: Date;
  modifiedAt: Date
}

export interface IArea {
  width: number;
  height: number;
}

export interface ICoords {
  x: number;
  y: number;
}

export enum EnumCardinalPoints {
  N = 'N',
  S = 'S',
  E = 'E',
  W = 'W',
}

export enum EnumRoverStatus {
  moving = 'moving',
  sleep = 'sleep',
  ko = 'KO'
}