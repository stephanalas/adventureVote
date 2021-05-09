const db = require('./db');
const {
  User,
  Trip,
  Event,
  User_Friend,
  Trip_Attendee,
} = require('./db/models');

const seed = async () => {
  await db.sync({ force: true });
  // creating users
  const [steph, charrice, john, jane] = await Promise.all([
    User.create({
      username: 'stephalas',
      password: 'password123',
      email: 'sa@gmail.com',
    }),
    User.create({
      username: 'charrice',
      password: 'password123',
      email: 'ca@gmail.com',
    }),
    User.create({
      username: 'john',
      password: 'password123',
      email: 'john@gmail.com',
    }),
    User.create({
      username: 'jane',
      password: 'password123',
      email: 'jane@gmail.com',
    }),
  ]);
  // creating friendships
  await Promise.all([
    User_Friend.create({ userId: steph.id, friendId: charrice.id }),
    User_Friend.create({ userId: steph.id, friendId: john.id }),
    User_Friend.create({ userId: steph.id, friendId: jane.id }),
    User_Friend.create({ userId: charrice.id, friendId: steph.id }),
    User_Friend.create({ userId: charrice.id, friendId: john.id }),
    User_Friend.create({ userId: charrice.id, friendId: jane.id }),
    User_Friend.create({ userId: john.id, friendId: steph.id }),
    User_Friend.create({ userId: john.id, friendId: charrice.id }),
    User_Friend.create({ userId: john.id, friendId: jane.id }),
    User_Friend.create({ userId: jane.id, friendId: steph.id }),
    User_Friend.create({ userId: jane.id, friendId: charrice.id }),
    User_Friend.create({ userId: jane.id, friendId: john.id }),
  ]);
  // Creating Trips
  const [vegas, rockyMountains, miami, poconos] = await Promise.all([
    Trip.create({
      name: 'Family vacation',
      location: 'Las Vegas, Nevada',
      startDate: '2021-08-30',
      endDate: '2021-09-05',
      userId: steph.id,
    }),
    Trip.create({
      name: 'Camping',
      location: 'Rocky Mountains',
      startDate: '2021-09-15',
      endDate: '2021-09-19',
      userId: john.id,
      activity: 'camping',
    }),
    Trip.create({
      name: 'Lets go to Miami!',
      location: 'Miami, Florida',
      startDate: '2021-07-30',
      endDate: '2021-08-03',
      userId: charrice.id,
      activity: 'vacation',
    }),
    Trip.create({
      name: 'Snowboarding trip',
      location: 'Poconos, Pennsylvannia',
      startDate: '2021-08-30',
      endDate: '2021-09-05',
      userId: jane.id,
      activity: 'wintersports',
    }),
  ]);
  await Promise.all([
    Trip_Attendee.create({ tripId: vegas.id, attendeeId: steph.id }),
    Trip_Attendee.create({ tripId: vegas.id, attendeeId: charrice.id }),
    Trip_Attendee.create({ tripId: vegas.id, attendeeId: john.id }),
    Trip_Attendee.create({ tripId: vegas.id, attendeeId: jane.id }),
    Trip_Attendee.create({ tripId: rockyMountains.id, attendeeId: steph.id }),
    Trip_Attendee.create({
      tripId: rockyMountains.id,
      attendeeId: charrice.id,
    }),
    Trip_Attendee.create({ tripId: rockyMountains.id, attendeeId: john.id }),
    Trip_Attendee.create({ tripId: rockyMountains.id, attendeeId: jane.id }),
    Trip_Attendee.create({ tripId: miami.id, attendeeId: charrice.id }),
    Trip_Attendee.create({ tripId: miami.id, attendeeId: steph.id }),
    Trip_Attendee.create({ tripId: miami.id, attendeeId: john.id }),
    Trip_Attendee.create({ tripId: miami.id, attendeeId: jane.id }),
    Trip_Attendee.create({ tripId: poconos.id, attendeeId: steph.id }),
    Trip_Attendee.create({ tripId: poconos.id, attendeeId: charrice.id }),
    Trip_Attendee.create({ tripId: poconos.id, attendeeId: john.id }),
    Trip_Attendee.create({ tripId: poconos.id, attendeeId: jane.id }),
  ]);

  // creating events
  const [
    gambling,
    comedyShow,
    dinner,
    rockClimbing,
    canoeing,
    rafting,
    scubaDiving,
    beach,
    club,
    snowboarding,
    tubbing,
    iceSkating,
  ] = await Promise.all([
    Event.create({
      name: 'gambling',
      location: 'vegas',
      startTime: '2021-08-31 11:28:01.306-04',
      tripId: vegas.id,
      userId: steph.id,
      activity: 'gambling',
    }),
    Event.create({
      name: 'Stand Up Comedy',
      location: 'vegas',
      startTime: '2021-08-31 11:28:01.306-04',
      tripId: vegas.id,
      userId: steph.id,
      activity: 'show',
    }),
    Event.create({
      name: 'Dinner',
      location: 'vegas',
      startTime: '2021-08-31 11:28:01.306-04',
      tripId: vegas.id,
      userId: steph.id,
      activity: 'dinner',
    }),
    Event.create({
      name: 'Rock Climbing',
      location: 'Rocky Mountains',
      startTime: '2021-08-31 11:28:01.306-04',
      tripId: rockyMountains.id,
      userId: john.id,
      activity: 'outdoor',
    }),
    Event.create({
      name: 'Canoeing',
      location: 'Rocky Mountains',
      startTime: '2021-08-31 11:28:01.306-04',
      tripId: rockyMountains.id,
      userId: john.id,
      activity: 'outdoor',
    }),
    Event.create({
      name: 'Rafting',
      location: 'Rocky Mountains',
      startTime: '2021-08-31 11:28:01.306-04',
      tripId: rockyMountains.id,
      userId: john.id,
      activity: 'outdoor',
    }),
    Event.create({
      name: 'Scuba Diving',
      location: 'Miami, Florida',
      startTime: '2021-08-31 11:28:01.306-04',
      tripId: miami.id,
      userId: charrice.id,
      activity: 'outdoor',
    }),
    Event.create({
      name: 'beach',
      location: 'Miami, Florida',
      startTime: '2021-08-31 11:28:01.306-04',
      tripId: miami.id,
      userId: charrice.id,
      activity: 'show',
    }),
    Event.create({
      name: 'clubbing',
      location: 'Miami, Florida',
      startTime: '2021-08-31 11:28:01.306-04',
      tripId: miami.id,
      userId: charrice.id,
      activity: 'club',
    }),
    Event.create({
      name: 'snowboarding',
      location: 'Poconos, Pennsylvannia',
      startTime: '2021-08-31 11:28:01.306-04',
      tripId: poconos.id,
      userId: jane.id,
      activity: 'wintersports',
    }),
    Event.create({
      name: 'tubbing',
      location: 'Poconos, Pennsylvannia',
      startTime: '2021-08-31 11:28:01.306-04',
      tripId: poconos.id,
      userId: jane.id,
      activity: 'wintersports',
    }),
    Event.create({
      name: 'ice skating',
      location: 'Poconos, Pennsylvannia',
      startTime: '2021-08-31 11:28:01.306-04',
      tripId: poconos.id,
      userId: jane.id,
      activity: 'wintersports',
    }),
  ]);
};

module.exports = seed;
