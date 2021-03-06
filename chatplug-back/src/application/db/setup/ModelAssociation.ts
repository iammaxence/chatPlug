import models from './initModels';

const { userModel, roomModel, messageModel, userRoomModel, instanceSequelize } = models;

// Many-To-Many between USER AND ROOM
userModel.belongsToMany(roomModel, { through: userRoomModel, foreignKey: 'userId', as: 'room'});
roomModel.belongsToMany(userModel, { through: userRoomModel, foreignKey: 'roomId', as: 'user'});

// One-To-Many between USER AND MESSAGE
userModel.hasMany(messageModel, {foreignKey: 'userId', as: 'message'});
messageModel.belongsTo(userModel, {foreignKey: 'userId', as: 'user'});

// One-To-Many between ROOM AND MESSAGE
roomModel.hasMany(messageModel, {foreignKey: 'roomId' as 'message'});
messageModel.belongsTo(roomModel, {foreignKey: 'roomId' as 'room'});

export = {
  instanceSequelize
}