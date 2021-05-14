const users = require('express').Router();
const {
  User,
  Trip,
  TripEvent,
  User_Friend,
  Attendee,
} = require('../db/models');
const requireToken = require('../requireToken');

//gets all users

users.get('/', requireToken, (req, res, next) => {
  if (req.user) {
    User.findAll({
      include: [
        {
          model: Trip,
          include: [TripEvent],
        },
        {
          model: User,
          as: 'friends',
        },
      ],
    })
      .then((users) => {
        res.status(200).send(users);
      })
      .catch((err) => {
        next(err);
      });
  } else {
    throw Error('you must login or sign up!');
  }
});

// creates user

users.post('/', (req, res, next) => {
  const { username, email, password } = req.body;
  User.findOne({ where: { email } })
    .then((user) => {
      console.log(user);
      if (user) {
        res.status(403).json({ message: 'User already exists' });
      }
    })
    .then(() => {
      return User.create({ username, email, password });
    })
    .then((user) => {
      return User.authenticate({ email, password });
    })
    .then((token) => {
      res.status(201).send({ token });
    })
    .catch((err) => {
      next(err);
    });
});

// get user by id (admin required)
users.get('/:id', requireToken, (req, res, next) => {
  res.status(200).send(req.user);
});

// delete user

users.delete('/:id', (req, res, next) => {
  User.findOne({
    where: {
      id: req.params.id,
    },
  }).then((user) => {
    user.destroy();
    res.sendStatus(200);
  });
});

// update userinfo
users.put('/:id', (req, res, next) => {
  const { username, email, password } = req.body;
  User.findByPk(req.params.id)
    .then(async (user) => {
      user.username = username;
      user.email = email;
      user.password = password;
      await user.save();
      return user;
    })
    .then((user) => {
      res.send(user).status(200);
    })
    .catch((err) => {
      next(err);
    });
});

// create trip for user

users.post('/:id/trips', (req, res, next) => {
  const { name, location, departureDate, returnDate } = req.body;
  Trip.create({
    name,
    location,
    departureDate,
    returnDate,
    creatorId: req.params.id,
  })
    .then((trip) => {
      res.send(trip).status(201);
    })
    .catch((err) => {
      next(err);
    });
});

// delete trip
users.delete('/:userId/trips/:tripId', async (req, res, next) => {
  try {
    const trip = await Trip.findOne({
      where: {
        id: req.params.tripId,
      },
    });
    if (trip.creatorId !== req.params.userId) {
      throw Error('Unable to delete trip!');
    }
    trip.destroy();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
});

// get all users trips

users.get('/:id/trips', async (req, res, next) => {
  try {
    const userCreatedTrips = await Trip.findAll({
      where: {
        creatorId: req.params.id,
      },
    });

    const potentialTripsAttending = await Attendee.findAll({
      where: {
        attendeeId: req.params.id,
        status: 'pending' || 'going',
      },
    });
    console.log(potentialTripsAttending);
    const invitedTrips = potentialTripsAttending.map(async (attendance) => {
      // console.log(attendance);
      const trip = await Trip.findOne({ where: { id: attendance.tripId } });
      console.log(trip);
      if (trip.creatorId !== attendance.attendeeId) return trip;
    });
    res.status(200).send(userCreatedTrips.concat(invitedTrips));
  } catch (error) {
    next(error);
  }
  //   Trip.findAll({
  //     where: {
  //       creatorId: req.params.id,
  //     },
  //   }).then((trips) => {
  //     res.send(trips).status(200);
  //   });
  // });
});
// update user's trip

users.put('/:userId/trips/:tripId', (req, res, next) => {
  const { name, location, departureDate, returnDate } = req.body;
  Trip.findOne({
    where: {
      id: req.params.tripId,
      creatorId: req.params.userId,
    },
  }).then((trip) => {
    trip.name = name;
    trip.location = location;
    trip.departureDate = departureDate;
    trip.returnDate = returnDate;
    res.send(trip).status(200);
  });
});

// create event for user's trip
users.post('/:userId/trips/:tripId/events', (req, res, next) => {
  const { name, location, startTime, activity } = req.body;
  TripEvent.create({
    name,
    location,
    startTime,
    activity,
    creatorId: req.params.userId,
    tripId: req.params.tripId,
  }).then((tripEvent) => {
    res.status(201).send(tripEvent);
  });
});

// update an event in user trip

users.put('/:userId/trips/:tripId/events/:eventId', (req, res, next) => {
  TripEvent.findOne({
    where: {
      id: req.params.eventId,
      tripId: req.params.tripId,
    },
  }).then();
});
// handle friend relationships

users.post('/:userId/friends/:friendId', (req, res, next) => {
  User_Friend.findOne({
    where: {
      userId: req.params.friendId,
      friendId: req.params.userId,
    },
  })
    .then(async (friendship) => {
      if (friendship) {
        friendship.status = 'approved';
        await friendship.save();
        await User_Friend.create({
          userId: req.params.userId,
          friendId: req.params.friendId,
          status: 'approved',
        });
      } else {
        await User_Friend.create({
          userId: req.params.userId,
          friendId: req.params.friendId,
          status: 'pending',
        });
      }

      const updatedUser = await User.findOne({
        where: { id: req.params.userId },
        include: [
          {
            model: User,
            as: 'friends',
          },
          {
            model: Trip,
            include: TripEvent,
          },
        ],
      });
      res.status(200).send(updatedUser);
    })
    .catch((err) => console.log(err));
});

users.post(
  '/:userId/trips/:tripId/friends/:friendId',
  async (req, res, next) => {
    try {
      const request = await Attendee.create({
        tripId: req.params.tripId,
        attendeeId: req.params.friendId,
        status: 'pending',
      });
      res.status(201).send(request);
    } catch (error) {
      console.log('error with adding friend to trip');
    }
  }
);
module.exports = users;
