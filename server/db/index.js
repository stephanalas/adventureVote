const Sequelize = require('sequelize');
const db = new Sequelize(
  process.env.DATABASE_URL || 'postgres://localhost/adventure_vote',
  { logging: false }
);

module.exports = db;
