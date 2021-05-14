const { Model, DataTypes } = require('sequelize');
const db = require('..');

class Attendee extends Model {}
Attendee.init(
  {
    status: {
      type: DataTypes.ENUM(['pending', 'going', 'declined']),
      allowNull: true,
      defaultValue: 'pending',
    },
  },
  {
    sequelize: db,
    modelName: 'Attendees',
    hooks: {
      beforeCreate: (attendee) => {
        console.log(attendee);
      },
    },
  }
);

module.exports = Attendee;
