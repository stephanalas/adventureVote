const { DataTypes, Model } = require('sequelize');
const db = require('..');
const Trip_Attendee = require('./TripAttendee');
class Trip extends Model {}

Trip.init(
  {
    name: {
      type: DataTypes.STRING,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: 'trip',
    hooks: {
      afterCreate: async (trip) => {
        const creator = await trip.getCreator();
        if (creator) {
          await Trip_Attendee.create({
            tripId: trip.id,
            attendeeId: creator.id,
          });
        }
      },
    },
  }
);

module.exports = Trip;
