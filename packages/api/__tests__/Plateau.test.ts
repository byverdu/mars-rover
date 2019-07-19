import * as mongoose from 'mongoose';
import {v4} from 'uuid';
import Plateau from '../models/Plateau';
import {IPlateau, ICoords, IArea} from '../models/Interfaces';

describe('Plateau model', () => {
  const uuid = v4();
  const name = 'mars';
  const size: IArea = {
    width: 5,
    height: 5
  };
  const plateau: IPlateau = new Plateau({
    uuid,
    name,
    size
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
    expect(plateau.uuid).toEqual(uuid);
  });
  it('Should have a name property', async () => {
    expect(plateau.name).toEqual(name);
  });
  it('Should have a size property', async () => {
    expect(plateau.size).toEqual(size);
  });

  it('Should save a plateau', async () => {
    const spy = jest.spyOn(plateau, 'save');
    plateau.save();

    expect(spy).toHaveBeenCalled();
  });
});
