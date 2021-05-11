const router = require('express').Router();
const users = require('./users');
const trips = require('./trips');
router.use('/users', users);
router.use('/trips', trips);

module.exports = router;
