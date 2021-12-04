import db from '../db';
import initUserModel from '../models/user.model';
import initMessageModel from '../models/message.model';
import initRoomModel from '../models/room.model';
import initUserRoomModel from '../models/userRoom.model';

const { instanceSequelize } = db;

const userModel = initUserModel(instanceSequelize);
const roomModel = initRoomModel(instanceSequelize);
const messageModel = initMessageModel(instanceSequelize);
const userRoomModel = initUserRoomModel(instanceSequelize);

export = {
  userModel,
  roomModel,
  messageModel,
  userRoomModel,
  instanceSequelize,
}