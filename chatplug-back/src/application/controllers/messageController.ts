import { Request, Response } from "express";
import { ResponseHandler } from "../../common/ResponseHandler";
import { CreateMessageAdapter } from "../../infrastructure/adapter/message/createMessageAdapter/CreateMessageAdapter";
import { CreateMessageUseCaseResponse } from "../../domains/message/useCase/createMessageUseCase/CreateMessageUseCaseResponse";
import { CreateMessageUseCase } from "../../domains/message/useCase/createMessageUseCase/CreateMessageUseCase";

export class MessageController {
  responseHandler: ResponseHandler;
  createMessageUseCase: CreateMessageUseCase;

  constructor(
    responseHandler: ResponseHandler,
    createMessageUseCase: CreateMessageUseCase
  ) {
    this.responseHandler = responseHandler;
    this.createMessageUseCase = createMessageUseCase;
  }

  public async createMessage (req: Request, res: Response){
    const adapter: CreateMessageAdapter = new CreateMessageAdapter(req.body);

    const response: CreateMessageUseCaseResponse = await this.createMessageUseCase.execute(adapter);

    if(response.status_code !== 200)
    return this.responseHandler.error(res, response);

    return res.send(response.createdMessage);
  }
}

// const { messageModel, userRoomModel, userModel } = models;

// const createMessage = async (req: Request, res: Response, next: NextFunction) => {
//   //Validator on body

//   const { userId, roomId, text } = req.body;
//   const message = { userId, roomId, text, date: new Date()}

//   const responseMessage = await messageModel.create(message)
//     .catch((err: Error) => {
//     res.status(500).send({
//       message:
//         err.message || "Some error occurred while creating a message."
//     });
//   });;
  
//   res.send(responseMessage);
// }

// const getAllMessagesFromRoom = async (req: Request, res: Response, next: NextFunction) => {
//   //Validator on body

//   const { roomId } = req.query;

//   const allUsersIdsInTheRoom = (await userRoomModel.findAll({
//     where: { roomId },
//     attributes: ['userId']
//   })).map(({userId}: {userId: number}) => userId);

//   const allMessagesFromRoom = (await messageModel.findAll({
//     where: { roomId },
//     include: {
//       model: userModel,
//       as: 'user',
//     },
//     order: [['date', 'ASC']]
//   })).map(({id, text, date, user}: { id: number, text: string, date: Date, user: {id: number, email: string, pseudo: string}}) => {
//     const { id: userId, email, pseudo } = user
//     const userFromDomain = new User(userId, email, pseudo);
  
//     return new Message(id, text, date, userFromDomain)
//   });
  
//   res.send(allMessagesFromRoom);
// }

// export = {
//   createMessage,
//   getAllMessagesFromRoom,
// }