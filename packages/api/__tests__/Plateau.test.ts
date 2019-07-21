import * as mongoose from 'mongoose';
import { plateauData } from './mockData';

describe('Plateau model', () => {
  const { plateau, uuid, name, size, rovers } = plateauData;
  beforeAll(async () => {
    await mongoose.connect(global.__MONGO_URI__, {
      useNewUrlParser: true
    });
  });

  afterAll(async () => {
    mongoose.connection.db.dropDatabase( () => {
      mongoose.connection.close();
    });
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

  it('Should have a rovers property with 2 items', async () => {
    expect(plateau.rovers[0]).toEqual(rovers[0]);
    expect(plateau.rovers[1]).toEqual(rovers[1]);
    expect(plateau.rovers).toHaveLength(2);
  });

  it('Should save a plateau', async () => {
    const spy = jest.spyOn(plateau, 'save');
    plateau.save();

    expect(spy).toHaveBeenCalled();
  });
});
