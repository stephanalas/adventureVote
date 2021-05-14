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
    voteCount: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  { sequelize: db, modelName: 'event' }
);

module.exports = TripEvent;
