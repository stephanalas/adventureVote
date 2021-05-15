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
        model: User,
        through: Attendee,
        as: 'attendees',
      },
    ],
  }).then((trips) => {
    res.send(trips).status(200);
  });
});
trips.get('/:tripId', (req, res, next) => {
  Trip.findOne({
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
  }).then((trips) => {
    res.send(trips).status(200);
  });
});

module.exports = trips;
