const supertest = require('supertest');
const app = require('../../../server/app');
const db = require('../../../server/db');
const { User } = require('../../../server/db/models');

const mockApp = supertest(app);

const seed = require('../../../server/seed');

describe('User router', () => {
  let user, backUpUser;
  beforeAll(async () => {
    await seed();
    const response = await mockApp.get('/api/users/1');
    user = response.body;
    const response2 = await mockApp.get('/api/users/2');
    backUpUser = response2.body;
  });
  describe('GET /users', () => {
    it('sends all users', async () => {
      const response = await mockApp.get('/api/users');
      expect(response.body.length).toBe(4);
      expect(response.status).toBe(200);
    });
  });
  describe('POST /users', () => {
    it('creates user', async () => {
      const userData = {
        username: 'samantha',
        email: 'sam@gmail.com',
        password: 'password123',
      };
      const response = await mockApp.post('/api/users').send(userData);
      expect(response.body.username).toBe('samantha');
      expect(response.status).toBe(201);
    });
  });
  describe('DELETE /users/:id', () => {
    it('deletes user', async () => {
      const userEmail = user.email;
      const response = await mockApp.delete(`/api/users/${user.id}`);
      const potentialUser = await User.findOne({
        where: {
          email: userEmail,
        },
      });
      expect(response.status).toBe(200);
      expect(potentialUser).toBeFalsy();
    });
  });
  describe('GET /users/:id', () => {
    it('sends single user data', async () => {
      const response = await mockApp.get('/api/users/1');
      expect(response.body.id);
    });
  });
  describe('PUT /users/:id', () => {
    it('updates user', async () => {
      const { username } = backUpUser;
      console.log(username);
      const payload = {
        username: 'curvyjones',
        email: 'john@gmail.com',
        password: '123',
      };
      const response = await mockApp
        .put(`/api/users/${backUpUser.id}`)
        .send(payload);
      const updatedUser = response;
      expect(updatedUser.username).not.toBe(username);
      expect(response.status).toBe(200);
    });
  });

  describe('POST /users/:id/trips', () => {
    it('user can create a trip', async () => {
      const tripInfo = {
        name: 'Snowboarding trip',
        location: 'Poconos, Pennsylvannia',
        startDate: '2021-08-30',
        endDate: '2021-09-05',
        creatorId: backUpUser.id,
      };
      const response = await mockApp
        .post(`/api/users/${backUpUser.id}/trips`)
        .send(tripInfo);
      const trip = response.body;
      expect(trip.name).toBe('Snowboarding Trip');
      expect(trip.creatorId).toBe(backUpUser.id);
    });
  });
  describe('GET /users/:id/trips/', () => {
    it('returns all of users trips', async () => {
      const tripInfo = {
        name: 'Lets go to Miami!',
        location: 'Miami, Florida',
        startDate: '2021-07-30',
        endDate: '2021-08-03',
        creatorId: backUpUser.id,
        activity: 'vacation',
      };
      let newTrip = await mockApp
        .post(`/api/users/${backUpUser.id}/trips`)
        .send(tripInfo);
      newTrip = newTrip.body;
      let foundTrip = false;

      const response = await mockApp.get(`/api/users/${backUpUser.id}/trips`);
      const userTrips = response.body;
      userTrips.forEach((trip) => {
        if (newTrip.id === trip.id) foundTrip = true;
      });
      expect(userTrips.length).toBeTruthy();
      expect(foundTrip).toBeTruthy();
    });
    // describe('PUT /api/users/:userId/trips/:tripId', () => {
    //   it('user can update their trip', () => {

    //   })
    // })
  });
  afterAll(async () => {
    await db.close();
  });
});
