const users = require('express').Router();
const { User, Trip, TripEvent } = require('../db/models');

users.get('/', (req, res, next) => {
  User.findAll({
    include: {
      model: Trip,
      include: [TripEvent],
    },
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

module.exports = users;
