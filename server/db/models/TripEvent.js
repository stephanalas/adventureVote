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
      allowNull: false,
    },
    startTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    activity: {
      type: DataTypes.STRING,
    },
  },
  { sequelize: db, modelName: 'event' }
);

module.exports = TripEvent;
