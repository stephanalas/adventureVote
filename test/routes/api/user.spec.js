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
  afterAll(async () => {
    await db.close();
  });
});
