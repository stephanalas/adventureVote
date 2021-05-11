const { DataTypes, Model } = require('sequelize');
const db = require('..');
const Attendee = require('./Attendee');
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
    hooks: {},
  }
);

module.exports = Trip;
