
const { Sequelize } = require('sequelize');
require('dotenv').config({
  path: require('path').join(__dirname, '../../.env')
});

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 3306),
    dialect: 'mysql',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,

    dialectOptions: {
      ssl: process.env.DB_SSL === 'true'
        ? {
            minVersion: 'TLSv1.2',
            rejectUnauthorized: true
          }
        : undefined
    },

    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

module.exports = sequelize;
