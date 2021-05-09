const { Event, User, Trip } = require('../../server/db/models');
const db = require('../../server/db');
describe('Trip Model', () => {
  let trip, user, event1, event2;
  beforeAll(async () => {
    await db.sync({ force: true });
    user = await User.create({
      username: 'stephalas',
      password: 'password123',
      email: 'sa@gmail.com',
    });
    trip = await Trip.create({
      name: 'Family vacation',
      location: 'Las Vegas, Nevada',
      startDate: '2021-08-30',
      endDate: '2021-09-05',
      userId: user.id,
      activity: 'gambling',
    });
    event1 = await Event.create({
      name: 'Hit the strip',
      location: 'vegas',
      startTime: '2021-08-31 11:28:01.306-04',
      tripId: trip.id,
      userId: user.id,
    });
    event2 = await Event.create({
      name: 'eat some food',
      location: 'vegas',
      startTime: '2021-08-31 15:28:01.306-04',
      tripId: trip.id,
      userId: user.id,
    });
  });

  it('has location', () => {
    expect(trip.location).toBe('Las Vegas, Nevada');
  });
  it('trip has a user', () => {
    expect(trip.userId).toBe(user.id);
  });
  it('trip can have many events', async () => {
    const events = await trip.getEvents();
    expect(events.length).toBe(2);
  });
  afterAll(async () => {
    await db.close();
  });
});
