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
    position: { type: String, required: true, unique: true },
    axis: {
      x: { type: Number, required: true, unique: true },
      y: { type: Number, required: true, unique: true }
    }
  },
  status: { type: String, required: true, unique: true },
  dateCreation: { type: Date, required: false },
  modifiedAt: { type: Date, required: false }
});

RoverSchema.pre('save', preSaveHook);

// Export the model and return your IRover interface
export default mongoose.model<IRover>('Rover', RoverSchema);
