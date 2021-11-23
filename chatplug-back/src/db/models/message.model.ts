import Sequelize from 'sequelize';

const initMessageModel = (sequelize: any) => sequelize.define("MESSAGE", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  text: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  date: {
    type: Sequelize.DATE(3),
    allowNull: false,
  },
}, 
{
  timestamps: false,
});

export default initMessageModel;