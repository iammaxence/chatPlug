import { Sequelize } from 'sequelize';
import config from '../../config';

const { database_name, username, password } = config;

// Connect to database
const sequelize = new Sequelize(database_name, username, password, {
  host: config.host,
  dialect: 'mysql',
  define: {
    freezeTableName: true
  },
});

export default {
  instanceSequelize: sequelize,
}