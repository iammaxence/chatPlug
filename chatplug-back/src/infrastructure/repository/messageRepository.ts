import models from '../../application/db/setup/initModels';
import { Message } from '../../domains/Message';
import { UserUseCaseDto } from '../../domains/user/dto/UserUseCaseDto';
const { messageModel, userModel } = models;

export class MessageRepository {

async createMessage(userId: number, roomId: number, text: string ) {

  const userDB = await userModel.findOne({ where : { id: userId } });
  const user = UserUseCaseDto.toDto(userDB);
  if(!user) throw Error(`User ${userId} doesn\'t exists`);

  const message = {userId, roomId, text, date: new Date()}

  const {id, date} = await messageModel.create(message);

  return new Message(id, text, date, user);
}

}