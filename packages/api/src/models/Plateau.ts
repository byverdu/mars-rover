import * as mongoose from 'mongoose';
import { IPlateau } from '../types/Interfaces';

const PlateauSchema: mongoose.Schema = new mongoose.Schema({
  uuid: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  size: {
    width: { type: Number, required: true },
    height: { type: Number, required: true }
  },
  rovers: { type: Array, required: true }
});

// Export the model and return your IPlateau interface
export default mongoose.model<IPlateau>('Plateau', PlateauSchema);
