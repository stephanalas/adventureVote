const users = require('express').Router();
const { User, Trip, TripEvent, User_Friend } = require('../db/models');
const requireToken = require('../requireToken');

users.get('/', (req, res, next) => {
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
});

users.post('/', (req, res, next) => {
  const { username, email, password } = req.body;
  User.create({ username, email, password })
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((err) => {
      next(err);
    });
});
users.get('/:id', (req, res, next) => {
  User.findOne({
    where: {
      id: req.params.id,
    },
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
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      next(err);
    });
});

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

users.post('/:id/trips', (req, res, next) => {
  const { name, location, startDate, endDate } = req.body;
  Trip.create({
    name,
    location,
    startDate,
    endDate,
    creatorId: req.params.id,
  })
    .then((trip) => {
      res.send(trip).status(201);
    })
    .catch((err) => {
      next(err);
    });
});

users.get('/:id/trips', (req, res, next) => {
  Trip.findAll({
    where: {
      creatorId: req.params.id,
    },
  }).then((trips) => {
    res.send(trips).status(200);
  });
});
// users.get('/:userId/trips/:tripId', (req, res, next) => {});

users.put('/:userId/trips/:tripId', (req, res, next) => {
  const { name, location, startDate, endDate } = req.body;
  Trip.findOne({
    where: {
      id: req.params.tripId,
      creatorId: req.params.userId,
    },
  }).then((trip) => {
    trip.name = name;
    trip.location = location;
    trip.startDate = startDate;
    trip.endDate = endDate;
    res.send(trip).status(200);
  });
});

users.put('/:userId/trips/:tripId/events/:eventId', (req, res, next) => {
  TripEvent.findOne({
    where: {
      id: req.params.eventId,
      tripId: req.params.tripId,
    },
  }).then();
});
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
        include: {
          model: User,
          as: 'friends',
        },
      });
      res.status(200).send(updatedUser);
    })
    .catch((err) => console.log(err));
});

// .then((friendship) => {
//   return User.findByPk(req.params.userId);
// })
// .then((user) => {
//   res.status(200).send(user);
// });

module.exports = users;
