const router = require('express').Router();
const users = require('./users');
const trips = require('./trips');
const login = require('./login');
router.use('/users', users);
router.use('/trips', trips);
router.use('/login', login);
module.exports = router;
