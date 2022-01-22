import models from '../../application/db/setup/initModels';
import { Message } from '../../domains/Message';
import { UserUseCaseDto } from '../../domains/user/dto/UserUseCaseDto';
const { messageModel, userModel, userRoomModel } = models;

export class MessageRepository {

async createMessage(userId: number, roomId: number, text: string ): Promise<Message> {

  const userDB = await userModel.findOne({ where : { id: userId } });
  const user = UserUseCaseDto.toDto(userDB);
  if(!user) throw Error(`User ${userId} doesn\'t exists`);

  const message = {userId, roomId, text, date: new Date()}

  const {id, date} = await messageModel.create(message);

  return new Message(id, text, date, user);
}

async getAllMessagesFromRoomId(roomId: number): Promise<[Message]|[]> {

  const allMessagesFromRoom = (await messageModel.findAll({
    where: { roomId },
    include: {
      model: userModel,
      as: 'user',
    },
    order: [['date', 'ASC']]
  })).map(({id, text, date, user: userDB}: { id: number, text: string, date: Date, user : {id: number, pseudo: string, status: string}}) => {
    console.log('USERDB: ',userDB);
    const user = UserUseCaseDto.toDto(userDB);
    return new Message(id, text, date, user!)
  });

  return allMessagesFromRoom;
}

}