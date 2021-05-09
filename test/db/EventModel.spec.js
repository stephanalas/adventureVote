const { Event, User, Trip } = require('../../server/db/models');
const db = require('../../server/db');
describe('Event Model', () => {
  let trip, event, user;
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
    });
    event = await Event.create({
      name: 'Hit the strip',
      location: 'vegas',
      startTime: '2021-08-31 11:28:01.306-04',
      tripId: trip.id,
      userId: user.id,
    });
  });
  it('has location', () => {
    expect(event.location).toBe('vegas');
  });
  it('has a trip id', () => {
    expect(event.tripId).toBe(trip.id);
  });
  it('has a user id', () => {
    expect(event.userId).toBe(1);
  });
  afterAll(async () => {
    await db.close();
  });
});
