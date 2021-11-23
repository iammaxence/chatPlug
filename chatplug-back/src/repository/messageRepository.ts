import models from '../db/setup/initModels';
import Message from '../models/Message';
import { User } from "../domain/User";
const { messageModel } = models;


const registerMessage = async (user: User, text: string ) => {
  const userId = user.getId();
  const message = {userId, text, date: new Date()}

  const {id, date} = await messageModel.create(message)
  
  return new Message(id, text, date);
}

export = {
  registerMessage,
}