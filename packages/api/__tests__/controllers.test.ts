import * as mongoose from 'mongoose';
import app from '../src/app';
import { EnumApiRoutes } from '../src/types/enums';
import { plateauData } from './mockData';

const request = require('supertest');

describe('Api Routes', () => {
  beforeAll(() => {
    mongoose
      .connect(global.__MONGO_URI__, {
        useNewUrlParser: true
      })
      .then(() => plateauData.plateau.save());
  });

  afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
  });

  describe('GET /health-check', function() {
    it('responds with a json file', function(done) {
      request(app)
        .get(EnumApiRoutes.getHealthCheck)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(function(res: Response) {
          expect(res.body).toEqual({
            status: 'ok'
          });
        })
        .expect(200, done);
    });
  });

  describe('GET /', function() {
    it('responds with an html file', function(done) {
      request(app)
        .get(EnumApiRoutes.getRoot)
        .expect('Content-Type', 'text/html; charset=utf-8')
        .expect(200, done);
    });
  });

  describe('GET /api/plateau', function() {
    it('responds with a json file', function(done) {
      request(app)
        .get(EnumApiRoutes.getPlateau)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(function(res: Response) {
          expect(res.body).toEqual(expect.any(Object));
        })
        .expect(200, done);
    });
  });

  describe('GET /api/plateau/delete-all', function() {
    it('responds with a json file', function(done) {
      request(app)
        .delete(EnumApiRoutes.deleteAllPlateau)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(function(res: Response) {
          expect(res.body).toEqual('Deleted 1 documents');
        })
        .expect(200, done);
    });
  });

  describe('POST /api/plateau/launch-rovers', function() {
    it('responds with a json file', function(done) {
      request(app)
        .post(EnumApiRoutes.postPlateau)
        .send({
          plateauSize: '7x7',
          rovers: [
            { position: '3 3 N', steps: 'MMR' },
            { position: '2 2 S', steps: 'LMR' }
          ]
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(function(res: Response) {
          const { uuid } = res.body as any;
          expect(res.body).toMatchObject({
            __v: 0,
            _id: expect.any(String),
            uuid,
            name: 'Mars',
            size: {
              width: 7,
              height: 7
            },
            rovers: [
              {
                _id: expect.any(String),
                lastKnownPosition: {
                  rawFormat: '3 3 N',
                  position: 'N',
                  axis: {
                    x: 3,
                    y: 3
                  }
                },
                newPosition: {
                  rawFormat: '3 5 E',
                  position: 'E',
                  axis: {
                    x: 3,
                    y: 5
                  }
                },
                uuidPlateau: uuid,
                status: 'sleep',
                stepsToNextPosition: {
                  steps: ['3 4 N', '3 5 N', '3 5 E'],
                  source: 'MMR'
                }
              },
              {
                _id: expect.any(String),
                lastKnownPosition: {
                  rawFormat: '2 2 S',
                  position: 'S',
                  axis: {
                    x: 2,
                    y: 2
                  }
                },
                newPosition: {
                  rawFormat: '3 2 S',
                  position: 'S',
                  axis: {
                    x: 3,
                    y: 2
                  }
                },
                uuidPlateau: uuid,
                status: 'sleep',
                stepsToNextPosition: {
                  steps: ['2 2 E', '3 2 E', '3 2 S'],
                  source: 'LMR'
                }
              }
            ]
          });
        })
        .expect(200, done);
    });
  });
});
