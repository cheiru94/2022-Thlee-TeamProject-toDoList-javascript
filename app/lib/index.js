const env = process.env;
const { Sequelize } = require('sequelize');

/* with docker-compose */
const db = new Sequelize(env.DB_NAME, env.DB_USER, env.DB_PASSWORD, {
  host: env.DB_HOST,
  port: env.DB_PORT,
  dialect: env.DB_DIALECT
});


module.exports = db;