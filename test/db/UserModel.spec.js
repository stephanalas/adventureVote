const { Event, User, Trip, User_Friend } = require('../../server/db/models');
const db = require('../../server/db');
describe('User Model', () => {
  let user1, user2, user3;
  beforeAll(async () => {
    await db.sync({ force: true });

    user1 = await User.create({
      username: 'stephalas',
      password: 'password123',
      email: 'sa@gmail.com',
    });
    user2 = await User.create({
      username: 'charrice',
      password: 'password123',
      email: 'ca@gmail.com',
    });
    user3 = await User.create({
      username: 'jane',
      password: 'password123',
      email: 'jane@gmail.com',
    });
    await User_Friend.create({
      userId: user1.id,
      friendId: user2.id,
    });
    await User_Friend.create({
      userId: user1.id,
      friendId: user3.id,
    });
    await User_Friend.create({
      userId: user2.id,
      friendId: user1.id,
    });
    trip1 = await Trip.create({
      name: 'Family vacation',
      location: 'Las Vegas, Nevada',
      startDate: '2021-08-30',
      endDate: '2021-09-05',
      creatorId: user1.id,
      activity: 'gambling',
    });

    trip2 = await Trip.create({
      name: 'Washington DC',
      location: 'Washington, D.C.',
      startDate: '2021-08-30',
      endDate: '2021-09-05',
      creatorId: user1.id,
      activity: 'siteseeing',
    });

    event1 = await Event.create({
      name: 'Hit the strip',
      location: 'vegas',
      startTime: '2021-08-31 11:28:01.306-04',
      tripId: trip1.id,
      creatorId: user1.id,
    });
    event2 = await Event.create({
      name: 'eat some food',
      location: 'vegas',
      startTime: '2021-08-31 15:28:01.306-04',
      tripId: trip1.id,
      creatorId: user1.id,
    });
    event3 = await Event.create({
      name: 'brunch',
      location: 'Washington D.C.',
      startTime: '2021-08-31 15:28:01.306-04',
      tripId: trip2.id,
      creatorId: user1.id,
    });
    event4 = await Event.create({
      name: 'Museum',
      location: 'Washington D.C.',
      startTime: '2021-08-31 15:28:01.306-04',
      tripId: trip2.id,
      creatorId: user1.id,
    });
  });
  it('User model exists', () => {
    // console.log(user1.__proto__);
    expect(user1.username).toBeTruthy();
  });
  it('User email is valid email', () => {
    expect(user1.email).toBe('sa@gmail.com');
  });
  it('User password should be hashed', () => {
    expect(user1.password).not.toBe('password123');
  });
  it('User can have many friends', async () => {
    const friends = await user1.getFriends();
    expect(friends.length).toBe(2);
  });
  it('User can have many trips', async () => {
    const trips = await user1.getTrips();
    expect(trips.length).toBe(2);
  });
  it('User can have many events', async () => {
    const events = await Event.findAll({
      where: {
        creatorId: user1.id,
      },
    });
    expect(events.length).toBe(4);
  });
  afterAll(async () => {
    await db.close();
  });
});
