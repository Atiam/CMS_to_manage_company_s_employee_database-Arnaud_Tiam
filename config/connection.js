const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: 'localhost',
    dialect: 'postgres'
  },
  console.log(`Connected to the employee_tracker_db database.`)
);




// EXPORT THIS MODULE ________________________________
module.exports = sequelize;