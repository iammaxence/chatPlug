import models from '../../application/db/setup/initModels';
import { Message } from '../../domains/Message';
import { Room } from '../../domains/Room';
import { User } from "../../domains/User";
const { messageModel } = models;


const registerMessage = async (user: User, room: Room, text: string ) => {
  const userId = user.getId();
  const roomId = room.getId();
  const message = {userId, roomId, text, date: new Date()}

  const {id, date} = await messageModel.create(message)
  
  return new Message(id, text, date, user);
}

export = {
  registerMessage,
}