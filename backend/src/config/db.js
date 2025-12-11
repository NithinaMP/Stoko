const { Sequelize } = require("sequelize");
require("dotenv").config();

const DB_DIALECT = process.env.DB_DIALECT || "mysql";
const DB_URL = process.env.DB_URL;

const sequelize = new Sequelize(DB_URL, {
  dialect: DB_DIALECT,
  logging: false
});

module.exports = sequelize;
