import * as mongoose from 'mongoose';
import { IPlateau } from './Interfaces';

const PlateauSchema: mongoose.Schema = new mongoose.Schema({
  uuid: { type: String, required: true, unique: true },
  name: { type: String, required: true, unique: true },
  size: {
    width: { type: Number, required: true, unique: true },
    height: { type: Number, required: true, unique: true }
  },
  rovers: { type: Array, required: true, unique: true }
});

// Export the model and return your IPlateau interface
export default mongoose.model<IPlateau>('Plateau', PlateauSchema);
