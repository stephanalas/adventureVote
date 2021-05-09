const { Event, User, Trip, Trip_Attendee } = require('../../server/db/models');
const db = require('../../server/db');
describe('Trip Model', () => {
  let trip, user1, user2, event1, event2;
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
    trip = await Trip.create({
      name: 'Family vacation',
      location: 'Las Vegas, Nevada',
      startDate: '2021-08-30',
      endDate: '2021-09-05',
      creatorId: user1.id,
      activity: 'gambling',
    });
    event1 = await Event.create({
      name: 'Hit the strip',
      location: 'vegas',
      startTime: '2021-08-31 11:28:01.306-04',
      tripId: trip.id,
      userId: user1.id,
    });
    event2 = await Event.create({
      name: 'eat some food',
      location: 'vegas',
      startTime: '2021-08-31 15:28:01.306-04',
      tripId: trip.id,
      userId: user1.id,
    });
    // await Trip_Attendee.create({ attendeeId: user2.id, tripId: trip.id });
  });

  it('has location', () => {
    expect(trip.location).toBe('Las Vegas, Nevada');
  });
  it('trip has a creator', () => {
    expect(trip.creatorId).toBe(user1.id);
  });
  it('trip can have many events', async () => {
    const events = await trip.getEvents();
    expect(events.length).toBe(2);
  });
  it('when a trip is made, the creator is an attendee of the the trip', async () => {
    const attendees = await trip.getAttendees();
    const creator = attendees.reduce((accum, attendee) => {
      if (attendee.id === trip.creatorId) accum = attendee;
      return accum;
    }, {});
    // expect(creator.id).toBe(trip.creatorId);
  });
  it('trip can have many attendees', async () => {
    // const attendees = await trip.getAttendees();
    // console.log(trip.__proto__);
    // expect(attendees.length).toBe
  });
  afterAll(async () => {
    await db.close();
  });
});
