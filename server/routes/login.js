const express = require('express');

const { User, Attendee, User_Friend } = require('../db/models');
const requireToken = require('../requireToken');

const login = express.Router();

login.post('/auth', async (req, res, next) => {
  try {
    const tokenOrError = await User.authenticate(req.body);

    const errors = [
      'email required',
      'password required',
      'email not found',
      'invalid password',
    ];
    if (errors.includes(tokenOrError)) {
      const error = tokenOrError;
      res.send({ error });
    } else {
      res.send({ token: await User.authenticate(req.body) });
    }
  } catch (ex) {
    next(ex);
  }
});

login.get('/auth', requireToken, async (req, res, next) => {
  // try {
  //   res.send(req.user);
  // } catch (ex) {
  //   next(ex);
  // }
  try {
    if (req.user.id) {
      const userId = req.user.id;
      const tripInvites = await Attendee.findAll({
        where: {
          attendeeId: userId,
          status: 'pending',
        },
      });
      const friendRequests = await User_Friend.findAll({
        where: {
          friendId: userId,
          status: 'pending',
        },
      });

      const notifications = { tripInvites, friendRequests };
      notifications;
      res.status(200).send({ user: req.user, notifications });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = login;
