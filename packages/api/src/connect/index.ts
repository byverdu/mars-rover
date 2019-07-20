import * as mongoose from 'mongoose';
import { TInput } from '../types/types';

export default ({ db }: TInput) => {
  const connect = () => {
    mongoose
      .connect(db, { useNewUrlParser: true })
      .then(() => {
        console.info(`Successfully connected to ${db}`);
      })
      .catch((error) => {
        console.error('Error connecting to database: ', error);
        return process.exit(1);
      });
  };
  connect();

  mongoose.connection.on('disconnected', connect);
};