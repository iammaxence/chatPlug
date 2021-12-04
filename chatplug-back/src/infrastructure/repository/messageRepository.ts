import models from '../../application/db/setup/initModels';
import { Message } from '../../domains/Message';
import { User } from "../../domains/User";
const { messageModel } = models;


const registerMessage = async (user: User, text: string ) => {
  const userId = user.getId();
  const message = {userId, text, date: new Date()}

  const {id, date} = await messageModel.create(message)
  
  return new Message(id, text, date, user);
}

export = {
  registerMessage,
}