import Sequelize from 'sequelize';

const initRoomModel = (sequelize: any) => sequelize.define("ROOM", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
}, 
{
  timestamps: false,
});

export default initRoomModel;