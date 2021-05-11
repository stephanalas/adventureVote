const { Model, DataTypes } = require('sequelize');
const db = require('..');

class Attendee extends Model {}
Attendee.init({}, { sequelize: db, modelName: 'Attendees' });

module.exports = Attendee;
