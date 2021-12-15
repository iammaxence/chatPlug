import Sequelize from 'sequelize';

const initUserModel = (sequelize: any) => sequelize.define("USER", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  pseudo: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'PENDING'
  },
}, 
{
  timestamps: false,
});

export default initUserModel;