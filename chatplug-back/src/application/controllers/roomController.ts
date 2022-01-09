import { Request, Response } from "express";
import { ResponseHandler } from "../../common/ResponseHandler";
import { CreateRoomUseCase } from "../../domains/room/useCase/CreateRoomUseCase.ts/CreateRoomUseCase";
import { CreateRoomUseCaseResponse } from "../../domains/room/useCase/CreateRoomUseCase.ts/CreateRoomUseCaseResponse";
import { JoinRoomUseCase } from "../../domains/room/useCase/joinRoomUseCase/JoinRoomUseCase";
import { JoinRoomUseCaseResponse } from "../../domains/room/useCase/joinRoomUseCase/JoinRoomUseCaseResponse";
import { CreateRoomAdapter } from "../../infrastructure/adapter/room/createRoomAdapter/CreateRoomAdapter";
import { JoinRoomAdapter } from "../../infrastructure/adapter/room/joinRoomAdapter/JoinRoomAdapter";

export class RoomController {
  responseHandler: ResponseHandler;
  createRoomUseCase: CreateRoomUseCase;
  joinRoomUseCase: JoinRoomUseCase;

  constructor(
    responseHandler: ResponseHandler,
    createRoomUseCase: CreateRoomUseCase,
    joinRoomUseCase: JoinRoomUseCase,
  ){
    this.responseHandler = responseHandler;
    this.createRoomUseCase = createRoomUseCase;
    this.joinRoomUseCase = joinRoomUseCase;
  }

  public async createRoom(req: Request, res: Response) {
  
   const adapter: CreateRoomAdapter = new CreateRoomAdapter(req.body);

   const response: CreateRoomUseCaseResponse = await this.createRoomUseCase.execute(adapter);
   
   if(response.status_code !== 200)
    return this.responseHandler.error(res, response);

    return res.send(response.createdRoom);
  }

  public async joinRoom(req: Request, res: Response) {
    const adapter: JoinRoomAdapter = new JoinRoomAdapter(req.body);

    const response: JoinRoomUseCaseResponse = await this.joinRoomUseCase.execute(adapter);

    if(response.status_code !== 200)
    return this.responseHandler.error(res, response);

    return res.send(response.joinRoom);
  }

}

// const findRoom = async (req: Request, res: Response, next: NextFunction) => {
//   //Validator on body
//   if(!req.query.roomName) throw new Error('Bad request exception : roomName is required');

//   const { roomName } = req.query;

//   const room = await roomModel.findOne({ where : { name: roomName } });
  
//   return res.send(room);
// } 

// export = {
//   createRoom,
//   joinRoom,
//   findRoom,
// }