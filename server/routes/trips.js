const trips = require('express').Router();
const { User, Trip, TripEvent, Attendee } = require('../db/models');

trips.get('/', (req, res, next) => {
  Trip.findAll({
    include: [
      {
        model: TripEvent,
      },
      {
        model: User,
        as: 'creator',
      },
      {
        model: Attendee,
      },
    ],
  }).then((trips) => {
    res.send(trips).status(200);
  });
});

module.exports = trips;
