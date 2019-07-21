import * as mongoose from 'mongoose';
import app from '../src/app';
import { plateauPayloadData, plateauData } from './mockData';

const request = require('supertest');

describe('Api Routes', () => {
  beforeAll(async () => {
    await mongoose.connect(global.__MONGO_URI__, {
      useNewUrlParser: true
    });
  });

  afterAll(async () => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close();
    });
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
        .send(plateauPayloadData)
        .set('Accept', 'application/json')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(function (res: Response) {
          const { uuid } = (res.body as any).data;
          expect(res.body).toMatchObject({
            data: {
              uuid,
              name: 'Mars',
              size: {
                width: 5,
                height: 5
              },
              rovers: [{
                lastKnownPosition: {
                  position: 'N',
                  axis: {
                    x: 1,
                    y: 1
                  },
                },
                uuidPlateau: uuid,
                status: 'sleep'
              },
              {
                lastKnownPosition: {
                  position: 'N',
                  axis: {
                    x: 2,
                    y: 2
                  },
                },
                uuidPlateau: uuid,
                status: 'sleep'
              }]
            }
          });
        })
        .expect(200, done);
    });
  });
});
