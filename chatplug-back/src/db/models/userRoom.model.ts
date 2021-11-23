import Sequelize from 'sequelize';

const initUserRoomModel = (sequelize: any) => sequelize.define("USER_ROOM", {}, 
{
  timestamps: false,
});

export default initUserRoomModel;