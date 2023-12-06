const {Sequelize} =require('sequelize')
const dotenv = require("dotenv");

dotenv.config();

const { DB_HOST, DB_USER, DB_PASS, DB_NAME, DB_DIALECT, DB_PORT, APP_ENV, DB_URL } =
  process.env;


  const db = DB_URL
    ? new Sequelize(DB_URL, {})
    : new Sequelize(DB_NAME, DB_USER, DB_PASS, {
        host: DB_HOST,
        dialect: DB_DIALECT,
        port: DB_PORT,
        logging: APP_ENV === "development" ? console.log : false,
      });

  module.exports = db;
