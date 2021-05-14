const { DataTypes, Model } = require('sequelize');
const db = require('..');
const Attendee = require('./Attendee');
const faker = require('faker');
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
    departureDate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    returnDate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize: db,
    modelName: 'trip',
    hooks: {
      beforeCreate: async (trip) => {
        try {
          if (!trip.name.length) {
            const trips = await Trip.findAll({
              where: { creatorId: trip.creatorId },
            });
            trip.name = `Trip ${trips.length + 1}`;
          }
          if (!trip.location.length) throw Error('location is required');
          if (!trip.departureDate.length || !trip.returnDate.length) {
            const newDate = new Date();
            const month = newDate.getMonth() + 1;
            const day = newDate.getDay();
            const year = newDate.getFullYear();
            const formatDate = month + '/' + day + '/' + year;
            trip.departureDate.length
              ? (trip.returnDate = formatDate)
              : (trip.departureDate = formatDate);
          }
          if (!trip.photo) {
            trip.photo = faker.image.city();
          }
        } catch (error) {
          console.log('trip hook issue');
          console.log(error);
        }
      },
    },
  }
);

module.exports = Trip;
