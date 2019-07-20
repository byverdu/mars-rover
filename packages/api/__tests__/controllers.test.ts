import app from '../src/app';

const request = require('supertest');

describe('GET /health-check', function() {
  it('responds with an html file', function(done) {
    request(app)
      .get('/health-check')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(function(res) {
        expect(res.body).toEqual({
          status: 'ok'
        });
      })
      .expect(200, done);
  });
});
