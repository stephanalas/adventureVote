let app = require('../../server/app');
app = require('supertest')(app);

describe('Routes', () => {
  test('GET /', async (done) => {
    const response = await app.get('/');
    expect(response.status).toBe(200);
    done();
  });
});
