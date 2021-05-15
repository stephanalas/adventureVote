const users = require('express').Router();
const { Op } = require('sequelize');
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
users.get('/:id', requireToken, async (req, res, next) => {
  res.send(req.user);
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
    if (trip.creatorId !== parseInt(req.params.userId)) {
      throw Error('Unable to delete trip!');
    }
    trip.destroy();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
});

// get all users trips

users.get('/:id/trips', requireToken, async (req, res, next) => {
  try {
    const userCreatedTrips = await Trip.findAll({
      where: {
        creatorId: req.user.id,
      },
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
    });
    const potentialTripsAttending = await Attendee.findAll({
      where: {
        attendeeId: req.user.id,
        status: 'pending' || 'going',
      },
    });
    const tripIds = potentialTripsAttending.map((trip) => trip.tripId);
    const returnOptions = (tripIds) => {
      return tripIds.map((id) => {
        return {
          id,
        };
      });
    };
    const trips = await Trip.findAll({
      where: {
        [Op.or]: returnOptions(tripIds),
      },
    });

    res.status(200).send(trips.concat(userCreatedTrips));
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
  console.log();
  Trip.findOne({
    where: {
      id: req.params.tripId,
      creatorId: req.params.userId,
    },
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
  })
    .then(async (trip) => {
      console.log(trip);
      trip.name = name;
      trip.location = location;
      trip.departureDate = departureDate;
      trip.returnDate = returnDate;
      await trip.save();
      res.send(trip).status(200);
    })
    .catch((error) => error);
});

// create event for user's trip
users.post('/:userId/trips/:tripId/events', (req, res, next) => {
  // name: {
  //     type: DataTypes.STRING,
  //   },
  //   location: {
  //     type: DataTypes.STRING,
  //   },
  //   departureDate: {
  //     type: DataTypes.STRING,
  //   },
  //   returnDate: {
  //     type: DataTypes.STRING,
  //   },
  //   startTime: {
  //     type: DataTypes.STRING,
  //   },
  //   endTime: {
  //     type: DataTypes.STRING,
  //   },
  //   activity: {
  //     type: DataTypes.STRING,
  //   },
  //   voteCount: {
  //     type: DataTypes.INTEGER,
  //     allowNull: true,
  //   },
  const {
    name,
    location,
    departureDate,
    returnDate,
    startTime,
    endTime,
    activity,
  } = req.body;
  TripEvent.create({
    name,
    location,
    departureDate,
    returnDate,
    endTime,
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
users.get('/:userId/notifications', async (req, res, next) => {
  try {
    const { userId } = req.params;
    const tripInvites = await Attendee.findAll({
      where: {
        attendeeId: userId,
        status: 'pending',
      },
    });
    console.log(tripInvites);
    const friendRequests = await User_Friend.findAll({
      where: {
        friendId: userId,
        status: 'pending',
      },
    });

    const notifications = { tripInvites, friendRequests };
    res.status(200).send(notifications);
  } catch (error) {
    next(error);
  }
});
module.exports = users;
