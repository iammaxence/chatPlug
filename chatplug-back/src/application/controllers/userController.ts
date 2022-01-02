import {Request, Response } from "express";
import models from '../db/setup/initModels';
import { CreateUserUseCase } from "../../domains/user/useCase/createUserUseCase/CreateUserUseCase";
import { CreateUserAdapter } from "../../infrastructure/adapter/user/createUserAdapter/CreateUserAdapter";
import { CreateUserUseCaseResponse } from "../../domains/user/useCase/createUserUseCase/CreateUserUseCaseResponse";
import { ResponseHandler } from "../../common/ResponseHandler";
import { GetUserAdapter } from "../../infrastructure/adapter/user/getUserAdapter/GetUserAdapter";
import { GetUserUseCaseResponse } from "../../domains/user/useCase/getUserUseCase/GetuserUseCaseResponse";
import { GetUserUseCase } from "../../domains/user/useCase/getUserUseCase/GetUserUsecase";
import { GetUserByEmailAdapter } from "../../infrastructure/adapter/user/getUserByEmailAdapter/GetUserByEmailAdapter";
import { GetUserByEmailUseCaseResponse } from "../../domains/user/useCase/getUserByEmailUseCase/GetUserUseCaseByEmailResponse";
import { UserExistsUseCaseResponse } from "../../domains/user/useCase/userExistsUseCase/UserExistsUseCaseResponse";
import { GetUserByEmailUseCase } from "../../domains/user/useCase/getUserByEmailUseCase/GetUserByEmailUseCase";
import { UserExistsAdapter } from "../../infrastructure/adapter/user/userExistsAdapter/UserExistsAdapter";
import { UserExistsUseCase } from "../../domains/user/useCase/userExistsUseCase/UserExistsUseCase";

export class UserController {
  responseHandler: ResponseHandler;
  createUserUseCase: CreateUserUseCase;
  getUserUseCase: GetUserUseCase;
  getUserByEmailUseCase: GetUserByEmailUseCase;
  userExistsUseCase: UserExistsUseCase;

  constructor(
    responseHandler: ResponseHandler,
    createUserUseCase: CreateUserUseCase,
    getUserUseCase: GetUserUseCase,
    getUserByEmailUseCase: GetUserByEmailUseCase,
    userExistsUseCase: UserExistsUseCase
    ) {
    this.responseHandler = responseHandler;
    this.createUserUseCase = createUserUseCase;
    this.getUserUseCase = getUserUseCase;
    this.getUserByEmailUseCase = getUserByEmailUseCase;
    this.userExistsUseCase = userExistsUseCase;
  }


  public async createUser (req: Request, res: Response) {

    const adapter: CreateUserAdapter = new CreateUserAdapter(req.body);

    const response: CreateUserUseCaseResponse = await this.createUserUseCase.execute(adapter);

    if(response.status_code !== 200)
      return this.responseHandler.error(res, response);

    return res.send(response.createdUser);
  }

  public async getUser (req: Request, res: Response) {

    const adapter: GetUserAdapter = new GetUserAdapter({ id: req.query.id as string });

    const response: GetUserUseCaseResponse = await this.getUserUseCase.execute(adapter);

    if(response.status_code !== 200)
      return this.responseHandler.error(res, response);

    return res.send(response.getUser);
  }
  
  public async getUserByEmail (req: Request, res: Response) {
    
    const adapter: GetUserByEmailAdapter = new GetUserByEmailAdapter({ email: req.query.email as string});
   
    const response: GetUserByEmailUseCaseResponse = await this.getUserByEmailUseCase.execute(adapter);
    
    if(response.status_code !== 200)
      return this.responseHandler.error(res, response);

    return res.send(response.getUserByEmail);
  }

  public async userExists (req: Request, res: Response) {

    const adapter: UserExistsAdapter = new UserExistsAdapter({ email: req.query.email as string});

    const response: UserExistsUseCaseResponse = await this.userExistsUseCase.execute(adapter);
    
    if(response.status_code !== 200)
      return this.responseHandler.error(res, response);
    
      return res.send(response.userExists);

  }

}
