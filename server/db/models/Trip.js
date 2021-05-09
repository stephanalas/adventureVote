const { DataTypes, Model } = require('sequelize');
const db = require('..');

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
    activity: {
      type: DataTypes.STRING,
    },
  },
  { sequelize: db, modelName: 'trip' }
);

module.exports = Trip;
