import * as mongoose from 'mongoose';
import { IRover } from '../types/Interfaces';

async function preSaveHook(next) {
  if (this._doc) {
    let doc = <IRover>this._doc;
    let now = new Date();
    if (!doc.dateCreation) {
      doc.dateCreation = now;
    } else {
      doc.modifiedAt = now;
    }
  }
  next();
  return this;
}

const RoverSchema: mongoose.Schema = new mongoose.Schema({
  uuid: { type: String, required: true, unique: true },
  uuidPlateau: { type: String, required: true, unique: true },
  lastKnownPosition: {
    rawFormat: { type: String },
    position: { type: String, required: true },
    axis: {
      x: { type: Number, required: true },
      y: { type: Number, required: true }
    }
  },
  newPosition: {
    rawFormat: { type: String },
    position: { type: String },
    axis: {
      x: { type: Number },
      y: { type: Number }
    }
  },
  stepsToNextPosition: {
    steps: { type: Array, required: true },
    source: { type: String, required: true }
  },
  status: { type: String, required: true },
  dateCreation: { type: Date, required: false },
  modifiedAt: { type: Date, required: false }
});

RoverSchema.pre('save', preSaveHook);

// Export the model and return your IRover interface
export default mongoose.model<IRover>('Rover', RoverSchema);
