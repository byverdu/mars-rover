import * as mongoose from 'mongoose';
import {v4} from 'uuid';
import Rover from '../models/Rover';
import {IRover, EnumCardinalPoints, EnumRoverStatus} from '../models/Interfaces';

describe('Plateau model', () => {
  const uuid = v4();
  const lastKnownPosition: IRover['lastKnownPosition'] = {
    axis: {
      x: 0,
      y: 0
    },
    position: EnumCardinalPoints.N
  };
  const status: EnumRoverStatus = EnumRoverStatus.sleep 
  const rover: IRover = new Rover({
    uuid,
    lastKnownPosition,
    status
  });
  beforeAll(async () => {
    await mongoose.connect('mongodb://127.0.0.1:27017/mars-rover_db', {
      useNewUrlParser: true
    });
  });

  afterAll(async () => {
    mongoose.connection.close();
  });

  it('Should have an uuid property', async () => {
    expect(rover.uuid).toEqual(uuid);
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

  it('Should save a rover and set the creation date', async () => {
    expect(rover.dateCreation).toEqual(undefined);
    const spy = jest.spyOn(rover, 'save');
    await rover.save();
    
    expect(spy).toHaveBeenCalled();
    expect(rover.dateCreation).toBeDefined();
  });
});
