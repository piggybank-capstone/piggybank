const Sequelize = require('sequelize');
const db = require('../db');

const Budget = db.define('budget', {
  amount: {
    type: Sequelize.INTEGER,
  }
});

module.exports = Budget;


