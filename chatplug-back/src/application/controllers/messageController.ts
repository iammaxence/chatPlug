import { Request, Response } from "express";
import { ResponseHandler } from "../../common/ResponseHandler";
import { CreateMessageAdapter } from "../../infrastructure/adapter/message/createMessageAdapter/CreateMessageAdapter";
import { CreateMessageUseCaseResponse } from "../../domains/message/useCase/createMessageUseCase/CreateMessageUseCaseResponse";
import { CreateMessageUseCase } from "../../domains/message/useCase/createMessageUseCase/CreateMessageUseCase";
import { GetAllMessagesFromRoomAdapter } from "../../infrastructure/adapter/message/getAllMessagesFromRoomAdapter/GetAllMessagesFromRoomAdapter";
import { GetAllMessagesFromRoomUseCaseResponse } from "../../domains/message/useCase/getAllMessagesFromRoomUseCase/GetAllMessagesFromRoomUseCaseResponse";
import { GetAllMessagesFromRoomUseCase } from "../../domains/message/useCase/getAllMessagesFromRoomUseCase/GetAllMessagesFromUseCase";

export class MessageController {
  responseHandler: ResponseHandler;
  createMessageUseCase: CreateMessageUseCase;
  getAllMessagesFromRoomUseCase: GetAllMessagesFromRoomUseCase;

  constructor(
    responseHandler: ResponseHandler,
    createMessageUseCase: CreateMessageUseCase,
    getAllMessagesFromRoomUseCase: GetAllMessagesFromRoomUseCase,
  ) {
    this.responseHandler = responseHandler;
    this.createMessageUseCase = createMessageUseCase;
    this.getAllMessagesFromRoomUseCase = getAllMessagesFromRoomUseCase;
  }

  public async createMessage (req: Request, res: Response){
    const adapter: CreateMessageAdapter = new CreateMessageAdapter(req.body);

    const response: CreateMessageUseCaseResponse = await this.createMessageUseCase.execute(adapter);

    if(response.status_code !== 200)
    return this.responseHandler.error(res, response);

    return res.send(response.createdMessage);
  }

  public async getAllMessagesFromRoom(req: Request, res: Response) {
    const adapter: GetAllMessagesFromRoomAdapter = new GetAllMessagesFromRoomAdapter({roomId: req.query.roomId as string});

    const response: GetAllMessagesFromRoomUseCaseResponse = await this.getAllMessagesFromRoomUseCase.execute(adapter);

    if(response.status_code !== 200)
    return this.responseHandler.error(res, response);

    return res.send(response.allMessagesFromRoom);
  }
}