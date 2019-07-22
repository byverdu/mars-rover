import * as mongoose from 'mongoose';
import app from '../src/app';

const request = require('supertest');

describe('Api Routes', () => {
  beforeAll(async () => {
    await mongoose.connect(global.__MONGO_URI__, {
      useNewUrlParser: true
    });
  });

  afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();

  });

  describe('GET /health-check', function () {
    it('responds with a json file', function (done) {
      request(app)
        .get('/health-check')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(function (res: Response) {
          expect(res.body).toEqual({
            status: 'ok'
          });
        })
        .expect(200, done);
    });
  });

  describe('GET /', function () {
    it('responds with an html file', function (done) {
      request(app)
        .get('/')
        .expect('Content-Type', 'text/html; charset=utf-8')
        .expect(200, done);
    });
  });

  describe('GET /api/plateau', function () {
    it('responds with a json file', function (done) {
      request(app)
        .get('/api/plateau')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(function (res: Response) {
          expect(res.body).toEqual({
            plateau: expect.any(Array)
          });
        })
        .expect(200, done);
    });
  });

  describe('POST /api/plateau/launch-rovers', function () {
    it('responds with a json file', function (done) {
      request(app)
        .post('/api/plateau/launch-rovers')
        .send({
          plateauSize: '7x7',
          rovers: [
            { position: '3 3 N', steps: 'MMR' },
            { position: '2 2 S', steps: 'LMR' }
          ]
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(function (res: Response) {
          const { uuid } = (res.body as any).data;
          expect(res.body).toMatchObject({
            data: {
              uuid,
              name: 'Mars',
              size: {
                width: 7,
                height: 7
              },
              rovers: [{
                lastKnownPosition: {
                  position: 'N',
                  axis: {
                    x: 3,
                    y: 3
                  },
                },
                newPosition: {
                  position: 'E',
                  axis: {
                    x: 3,
                    y: 5
                  },
                },
                uuidPlateau: uuid,
                status: 'sleep',
                stepsToNextPosition: {
                  steps: [ '3 4 N', '3 5 N', '3 5 E' ],
                  source: 'MMR'
                }
              },
              {
                lastKnownPosition: {
                  position: 'S',
                  axis: {
                    x: 2,
                    y: 2
                  },
                },
                newPosition: {
                  position: 'S',
                  axis: {
                    x: 3,
                    y: 2
                  },
                },
                uuidPlateau: uuid,
                status: 'sleep',
                stepsToNextPosition: {
                  steps: [ '2 2 E', '3 2 E', '3 2 S' ],
                  source: 'LMR'
                }
              }]
            }
          });
        })
        .expect(200, done);
    });
  });
});
