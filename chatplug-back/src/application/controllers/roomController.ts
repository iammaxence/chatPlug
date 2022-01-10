import { Request, Response } from "express";
import { ResponseHandler } from "../../common/ResponseHandler";
import { CreateRoomUseCase } from "../../domains/room/useCase/CreateRoomUseCase/CreateRoomUseCase";
import { CreateRoomUseCaseResponse } from "../../domains/room/useCase/CreateRoomUseCase/CreateRoomUseCaseResponse";
import { FindRoomUseCase } from "../../domains/room/useCase/findRoomUseCase/FindRoomUseCase";
import { FindRoomUseCaseResponse } from "../../domains/room/useCase/findRoomUseCase/FindRoomUseCaseResponse";
import { JoinRoomUseCase } from "../../domains/room/useCase/joinRoomUseCase/JoinRoomUseCase";
import { JoinRoomUseCaseResponse } from "../../domains/room/useCase/joinRoomUseCase/JoinRoomUseCaseResponse";
import { CreateRoomAdapter } from "../../infrastructure/adapter/room/createRoomAdapter/CreateRoomAdapter";
import { FindRoomAdapter } from "../../infrastructure/adapter/room/findRoomAdapter/FindRoomAdapter";
import { JoinRoomAdapter } from "../../infrastructure/adapter/room/joinRoomAdapter/JoinRoomAdapter";

export class RoomController {
  responseHandler: ResponseHandler;
  createRoomUseCase: CreateRoomUseCase;
  joinRoomUseCase: JoinRoomUseCase;
  findRoomUseCase: FindRoomUseCase;

  constructor(
    responseHandler: ResponseHandler,
    createRoomUseCase: CreateRoomUseCase,
    joinRoomUseCase: JoinRoomUseCase,
    findRoomUseCase: FindRoomUseCase,
  ){
    this.responseHandler = responseHandler;
    this.createRoomUseCase = createRoomUseCase;
    this.joinRoomUseCase = joinRoomUseCase;
    this.findRoomUseCase = findRoomUseCase;
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

  public async findRoom (req: Request, res: Response) {
    // Adapter need to check and throw exception if roomName does not exists
    const adapter: FindRoomAdapter = new FindRoomAdapter({ roomName: req.query.roomName as string});

    const response: FindRoomUseCaseResponse = await this.findRoomUseCase.execute(adapter);
    
    if(response.status_code !== 200)
    return this.responseHandler.error(res, response);

    return res.json(response.findRoom);
  } 

}
