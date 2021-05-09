const User = require('../../server/db/models/User');
const db = require('../../server/db');
describe('User Model', () => {
  let user;
  beforeAll(async () => {
    await db.sync({ force: true });
    user = await User.create({
      username: 'stephalas',
      password: 'password123',
      email: 'sa@gmail.com',
    });
  });
  it('User model exists', () => {
    expect(user.username).toBeTruthy();
  });
  it('User email is valid email', () => {
    expect(user.email).toBe('sa@gmail.com');
  });
  it('User password should be hashed', () => {
    expect(user.password).not.toBe('password123');
  });
  afterAll(async () => {
    await db.close();
  });
});
