const { DataTypes, Model } = require('sequelize');
const db = require('..');

class TripEvent extends Model {}

TripEvent.init(
  {
    name: {
      type: DataTypes.STRING,
    },
    location: {
      type: DataTypes.STRING,
    },
    departureDate: {
      type: DataTypes.STRING,
    },
    returnDate: {
      type: DataTypes.STRING,
    },
    startTime: {
      type: DataTypes.STRING,
    },
    endTime: {
      type: DataTypes.STRING,
    },
    activity: {
      type: DataTypes.STRING,
    },
    voteCount: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize: db,
    modelName: 'event',
    hooks: {
      beforeCreate: (event) => {
        event.voteCount = 0;
      },
    },
  }
);

module.exports = TripEvent;
