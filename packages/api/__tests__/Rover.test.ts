import * as mongoose from 'mongoose';
import { roverData } from './mockData';

describe('Rover model', () => {
  const { rover, uuid, uuidPlateau, lastKnownPosition, status } = roverData;

  beforeAll(async () => {
    await mongoose.connect(global.__MONGO_URI__, {
      useNewUrlParser: true
    });
  });

  afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
  });

  it('Should have an uuid property', async () => {
    expect(rover.uuid).toEqual(uuid);
  });

  it('Should have an uuidPlateau property', async () => {
    expect(rover.uuidPlateau).toEqual(uuidPlateau);
  });

  it('Should have a lastKnownPosition property', async () => {
    expect(rover.lastKnownPosition).toEqual(lastKnownPosition);
  });

  it('Should have a status property', async () => {
    expect(rover.status).toEqual(status);
  });

  it('Should have a dateCreation property', async () => {
    expect(rover.dateCreation).toEqual(undefined);
  });

  it('Should have a modifiedAt property', async () => {
    expect(rover.modifiedAt).toEqual(undefined);
  });

  it('Should save a rover and set the creation date', async () => {
    expect(rover.dateCreation).toEqual(undefined);
    const spy = jest.spyOn(rover, 'save');
    await rover.save();

    expect(spy).toHaveBeenCalled();
    expect(rover.dateCreation).toBeDefined();
  });

  it('Should change the modifiedAt property after any update', async () => {
    expect(rover.modifiedAt).toEqual(undefined);
    const spy = jest.spyOn(rover, 'save');
    await rover.save();
    await rover.save();

    expect(spy).toHaveBeenCalled();
    expect(rover.modifiedAt).toBeDefined();
  });
});
