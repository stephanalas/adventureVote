const { Model } = require('sequelize');
const db = require('..');

class Trip_Attendee extends Model {}
Trip_Attendee.init({}, { sequelize: db });

module.exports = Trip_Attendee;
