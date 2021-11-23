import { Sequelize } from 'sequelize';
const config = require('../config');

// Connect to database
const sequelize = new Sequelize(config.database_name, config.username, config.password, {
  host: config.host,
  dialect: 'mysql',
  define: {
    freezeTableName: true
  },
});

export default {
  instanceSequelize: sequelize,
}