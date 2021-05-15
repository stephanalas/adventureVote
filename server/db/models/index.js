const Trip = require('./Trip');
const User = require('./User');
const { Model, DataTypes } = require('sequelize');
const db = require('..');
const Attendee = require('./Attendee');
const TripEvent = require('./TripEvent');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
class User_Friend extends Model {}
User_Friend.init(
  {
    status: {
      type: DataTypes.ENUM(['pending', 'approved']),
    },
  },
  { sequelize: db }
);

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
User.belongsToMany(User, {
  through: User_Friend,
  foreignKey: 'friendId',
  as: 'friend',
});
// User.hasMany(User, { as: 'f' });
User.byToken = async (token) => {
  try {
    const { userId } = await jwt.verify(token, process.env.JWT);
    const user = await User.findAll({
      where: {
        id: userId,
      },
      include: [
        {
          model: User,
          as: 'friends',
        },
        {
          model: Trip,
          include: [
            {
              model: TripEvent,
            },
            {
              model: User,
              as: 'creator',
            },
            {
              model: User,
              through: Attendee,
              as: 'attendees',
            },
          ],
        },
      ],
    });
    if (user[0]) {
      return user[0];
    }
    return 'JsonWebTokenError';
  } catch (ex) {
    console.log(ex.name);
    return ex.name;
  }
};

User.authenticate = async ({ email, password }) => {
  if (!email) throw 'email requried';
  if (!password) throw 'password required';

  const user = await User.findOne({
    where: {
      email,
    },
  });
  if (!user) return 'email not found';
  if (user && (await bcrypt.compare(password, user.password))) {
    return jwt.sign({ userId: user.id }, process.env.JWT);
  }

  return 'invalid password';
};

module.exports = { User, Trip, TripEvent, User_Friend, Attendee };
