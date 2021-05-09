const Event = require('./Event');
const Trip = require('./Trip');
const User = require('./User');

// Trip.belongsToMany(User);
// User.hasMany(Trip);
// Trip.hasMany(User);
Trip.belongsTo(User);
Trip.hasMany(Event);
Event.belongsTo(Trip);
Event.belongsTo(User);
User.hasMany(Trip);

// Event.belongsTo(Trip);
// User.hasMany(Event);

// User.belongsToMany(User, { as: 'friends' });

module.exports = { User, Trip, Event };
