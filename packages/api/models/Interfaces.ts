import * as mongoose from 'mongoose';

export interface IPlateau extends mongoose.Document {
  uuid: string;
  name: string;
  size: IArea;
}

export interface IArea {
  width: number;
  height: number;
}

export interface ICoords {
  x: number;
  y: number;
}