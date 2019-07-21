import app from './app';

const { NODE_ENV = 'development', PORT = 9000 } = process.env;
const mongoHost = NODE_ENV === 'development' ? 'localhost' : 'mars-rover_db';
const MONGODB_URI = `mongodb://${mongoHost}:27017/mars-rover`;
const { connectDatabase } = require('./database');

(async () => {
  try {
    await connectDatabase(MONGODB_URI, NODE_ENV !== 'production');
  } catch (error) {
    console.error('Could not connect to database', { error });
    throw error;
  }

  app.listen(PORT, () => console.log(`Express server running at port ${PORT}`));
})();
