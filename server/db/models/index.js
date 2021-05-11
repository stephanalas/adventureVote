const Trip = require('./Trip');
const User = require('./User');
const { Model } = require('sequelize');
const db = require('..');
const Attendee = require('./Attendee');
const TripEvent = require('./TripEvent');
class User_Friend extends Model {}
User_Friend.init({}, { sequelize: db });

Trip.belongsTo(User, { as: 'creator' });
// User.hasMany(Trip);
Trip.hasMany(TripEvent);

TripEvent.belongsTo(Trip);
TripEvent.belongsTo(User, { as: 'creator' });

User.belongsToMany(Trip, {
  through: Attendee,
  foreignKey: {
    name: 'attendeeId',
  },
});
Trip.belongsToMany(User, {
  through: Attendee,
  as: 'attendees',
});
Trip.hasMany(Attendee);
// Attendee.belongsTo(Trip);

User.belongsToMany(User, { through: User_Friend, as: 'friends' });

module.exports = { User, Trip, TripEvent, User_Friend, Attendee };
