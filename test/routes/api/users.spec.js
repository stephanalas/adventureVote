const { response } = require('express');
const supertest = require('supertest');
const app = require('../../../server/app');
const db = require('../../../server/db');
const { User } = require('../../../server/db/models');

const mockApp = supertest(app);

const seed = require('../../../server/seed');

describe('User router', () => {
  let user, backUpUser, newUser, createdTrip;
  beforeAll(async () => {
    await seed();
    const response = await mockApp.get('/api/users/1');
    user = response.body;
    const response2 = await mockApp.get('/api/users/2');
    backUpUser = response2.body;
  });

  // GET ALL USERS

  describe('GET /users', () => {
    it('sends all users', async () => {
      const response = await mockApp.get('/api/users');
      expect(response.body.length).toBe(4);
      expect(response.status).toBe(200);
    });
  });

  // CREATE NEW USER

  describe('POST /users', () => {
    it('creates user', async () => {
      const userData = {
        username: 'samantha',
        email: 'sam@gmail.com',
        password: 'password123',
      };
      const response = await mockApp.post('/api/users').send(userData);
      newUser = response.body;
      expect(newUser.username).toBe('samantha');
      expect(response.status).toBe(201);
    });
  });

  // DELETE SINGLE USER

  describe('DELETE /users/:id', () => {
    it('deletes user', async () => {
      const userEmail = newUser.email;
      const response = await mockApp.delete(`/api/users/${newUser.id}`);
      const potentialUser = await User.findOne({
        where: {
          email: userEmail,
        },
      });
      expect(response.status).toBe(200);
      expect(potentialUser).toBeFalsy();
    });
  });

  // GET SINGLE USER

  describe('GET /users/:id', () => {
    it('sends single user data', async () => {
      const response = await mockApp.get('/api/users/1');
      expect(response.body.id).toBeTruthy();
    });
  });

  // UPDATE SINGLE USER

  describe('PUT /users/:id', () => {
    it('updates user', async () => {
      const { username } = user;
      const payload = {
        username: 'curvyjones',
        email: 'john@gmail.com',
        password: '123',
      };
      const response = await mockApp.put(`/api/users/${user.id}`).send(payload);
      const updatedUser = response.body;
      expect(updatedUser.username).not.toBe(username);
      expect(response.status).toBe(200);
    });
  });

  // USER CAN CREATE TRIPS

  describe('POST /users/:id/trips', () => {
    it('user can create a trip', async () => {
      const tripInfo = {
        name: 'Snowboarding Trip',
        location: 'Poconos, Pennsylvannia',
        startDate: '2021-08-30',
        endDate: '2021-09-05',
      };
      const response = await mockApp
        .post(`/api/users/${user.id}/trips`)
        .send(tripInfo);
      createdTrip = response.body;
      expect(createdTrip.name).toBe('Snowboarding Trip');
      expect(createdTrip.creatorId).toBe(user.id);
      expect(response.status).toBe(200);
    });
  });

  // GET ALL USER'S TRIPS

  describe('GET /users/:id/trips/', () => {
    it('returns all of users trips', async () => {
      const tripInfo = {
        name: 'Lets go to Miami!',
        location: 'Miami, Florida',
        startDate: '2021-07-30',
        endDate: '2021-08-03',
        creatorId: user.id,
        activity: 'vacation',
      };
      let newTrip = await mockApp
        .post(`/api/users/${user.id}/trips`)
        .send(tripInfo);
      newTrip = newTrip.body;
      let foundTrip = false;

      const response = await mockApp.get(`/api/users/${user.id}/trips`);
      const userTrips = response.body;
      userTrips.forEach((trip) => {
        if (newTrip.id === trip.id) foundTrip = true;
      });
      expect(userTrips.length).toBeTruthy();
      expect(foundTrip).toBeTruthy();
      expect(response.status).toBe(200);
    });
  });

  // USER UPDATE THEIR TRIP

  describe('PUT /api/users/:userId/trips/:tripId', () => {
    it('user can update their trip', async () => {
      const newTripInfo = {
        name: 'Miami!',
        location: 'Miami, Florida',
        startDate: '2021-07-30',
        endDate: '2021-08-03',
        creatorId: user.id,
      };
      const response = await mockApp
        .put(`/api/users/${user.id}/trips/${createdTrip.id}`)
        .send(newTripInfo);
      const newTrip = response.body;
      expect(response.status).toBe(200);
      expect(newTrip.name).toBe('Miami!');
    });
  });

  // USER CREATES EVENT FOR TRIP

  describe('POST /api/users/:userId/trips/:tripId/events', () => {
    it('user can create events in specific trips', async () => {
      let tripInfo = {
        name: 'Snowboarding Trip',
        location: 'Poconos, Pennsylvannia',
        startDate: '2021-08-30',
        endDate: '2021-09-05',
      };
      let response = await mockApp
        .post(`/api/users/${user.id}/trips`)
        .send(tripInfo);
      const trip = response.body;
      // tripInfo = {
      //   name: 'Canoeing Trip',
      //   location: 'Poconos, Pennsylvannia',
      //   startDate: '2021-09-6',
      //   endDate: '2021-09-10',
      // };
      // response = await mockApp
      //   .post(`/api/users/${backUpUser.id}/trips`)
      //   .send(tripInfo);
      // const trip2 = response.body;
      const event1Info = {
        name: 'snowboarding',
        location: 'Poconos, Pennsylvannia',
        startTime: '2021-08-31 11:28:01.306-04',
        tripId: trip.id,
        creatorId: user.id,
        activity: 'wintersports',
      };
      const event2Info = {
        name: 'tubbing',
        location: 'Poconos, Pennsylvannia',
        startTime: '2021-08-31 11:28:01.306-04',
        tripId: createdTrip.id,
        creatorId: user.id,
        activity: 'wintersports',
      };
      const event1Response = await mockApp
        .post(`/api/users/${user.id}/trips/${trip.id}/events`)
        .send(event1Info);
      const event2Response = await mockApp
        .post(`/api/users/${user.id}/trips/${createdTrip.id}/events`)
        .send(event2Info);
      const newEvent1 = event1Response.body;
      const newEvent2 = event2Response.body;
      expect(event2Response.status).toBe(201);
      expect(newEvent1.tripId).not.toBe(newEvent2.tripId);
      expect(newEvent1.creatorId).toBe(user.id);
      expect(newEvent2.creatorId).toBe(user.id);
    });
  });

  //UPDATE EVENTS IN SPECIFIC TRIPS

  describe('PUT /api/users/:userId/trips/:tripId/events/:eventId', () => {
    it('user can update events they created in specific trips', async () => {
      let tripInfo = {
        name: 'Snowboarding Trip',
        location: 'Poconos, Pennsylvannia',
        startDate: '2021-08-30',
        endDate: '2021-09-05',
      };
      let response = await mockApp
        .post(`/api/users/${user.id}/trips`)
        .send(tripInfo);
      const trip1 = response.body;
      tripInfo = {
        name: 'Canoeing Trip',
        location: 'Poconos, Pennsylvannia',
        startDate: '2021-09-06',
        endDate: '2021-09-10',
      };
      response = await mockApp
        .post(`/api/users/${user.id}/trips`)
        .send(tripInfo);
      const trip2 = response.body;
      const event1Info = {
        name: 'snowboarding',
        location: 'Poconos, Pennsylvannia',
        startTime: '2021-08-31 11:28:01.306-04',
        tripId: trip1.id,
        creatorId: user.id,
        activity: 'wintersports',
      };
      const event2Info = {
        name: 'tubbing',
        location: 'Poconos, Pennsylvannia',
        startTime: '2021-08-31 11:28:01.306-04',
        tripId: trip2.id,
        creatorId: user.id,
        activity: 'wintersports',
      };
      const event1Response = await mockApp
        .post(`/api/users/${user.id}/trips/${createdTrip.id}/events`)
        .send(event1Info);
      const event2Response = await mockApp
        .post(`/api/users/${user.id}/trips/${trip1.id}/events`)
        .send(event2Info);
      const newEvent1 = event1Response.body;
      const newEvent2 = event2Response.body;
      // console.log('new event 1 ', event1Response);
      // console.log('new event 2 ', event2Response);
      event1Info.name = 'sking';

      expect(newEvent1.tripId).not.toBe(newEvent2.tripId);
      expect(newEvent1.creatorId).toBe(user.id);
      expect(newEvent2.creatorId).toBe(user.id);
    });
    describe('POST /api/users/:userId/friends/:friendId', () => {
      it('User can add friends', async () => {
        const response = await mockApp.post(
          `/api/users/${user.id}/friends/${backUpUser.id}`
        );
        const { body } = response;
        let isFriend = false;
        body.friends.forEach((friend) => {
          if (friend.id === backUpUser.id) isFriend = true;
        });
        expect(isFriend).toBeTruthy();
      });
    });
  });

  afterAll(async () => {
    await db.close();
  });
});
