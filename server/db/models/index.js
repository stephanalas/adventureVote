const Event = require('./Event');
const Trip = require('./Trip');
const User = require('./User');
const { Model } = require('sequelize');
const db = require('..');
const Trip_Attendee = require('./TripAttendee');
class User_Friend extends Model {}
User_Friend.init({}, { sequelize: db });

Trip.belongsTo(User, { as: 'creator' });
Trip.hasMany(Event);

Event.belongsTo(Trip);
Event.belongsTo(User, { as: 'creator' });

User.belongsToMany(Trip, {
  through: Trip_Attendee,
  foreignKey: {
    name: 'attendeeId',
  },
});
Trip.belongsToMany(User, {
  through: Trip_Attendee,
  as: 'attendees',
});

User.belongsToMany(User, { through: User_Friend, as: 'friends' });

module.exports = { User, Trip, Event, User_Friend, Trip_Attendee };
