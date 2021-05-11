const supertest = require('supertest');
const app = require('../../../server/app');
const db = require('../../../server/db');
const { Trip } = require('../../../server/db/models');

const mockApp = supertest(app);

const seed = require('../../../server/seed');

describe('Trips router', () => {
  beforeAll(async () => [await seed()]);
  describe('GET /api/trips', () => {
    it('returns all trips', async () => {
      const response = await mockApp.get('/api/trips');
      const trips = response.body;
      expect(trips.length).toBeTruthy();
    });
  });
});
