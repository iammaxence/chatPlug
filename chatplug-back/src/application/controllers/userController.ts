import {Request, Response } from "express";
import models from '../db/setup/initModels';
import { CreateUserUseCase } from "../../domains/user/useCase/createUserUseCase/CreateUserUseCase";
import { CreateUserAdapter } from "../../infrastructure/adapter/user/createUserAdapter/CreateUserAdapter";
import { CreateUserUseCaseResponse } from "../../domains/user/useCase/createUserUseCase/CreateUserUseCaseResponse";

const { userModel } = models;

export class UserController {
  createUserUseCase:CreateUserUseCase;

  constructor(createUserUseCase: CreateUserUseCase) {
    this.createUserUseCase = createUserUseCase;
  }


  public async createUser (req: Request, res: Response) {

    const { body } = req;
    const adapter: CreateUserAdapter = new CreateUserAdapter({
      email: body.email,
      pseudo: body.pseudo,
      status: body.status,
    });

    const response: CreateUserUseCaseResponse = await this.createUserUseCase.execute(adapter);

    if(response.status_code !== 200)
      return  res
              .status(response.status_code)
              .send(response.error_message);

    return res.send(response.createdUser);
  }

  public async getUser (req: Request, res: Response) {}
  
  public async getUserByEmail (req: Request, res: Response) {}

  public async userExists (req: Request, res: Response) {}

}

// const createUser = async (req: Request, res: Response, next: NextFunction) => {
//   //Validator on body

//   //User to create
//   const {email, pseudo, status} = req.body;

//   // Save Tutorial in the database
//   userModel.create({ email, pseudo, status })
//     .then((data: any) => {
//       //Presenter 
//       return res.send(data);
//     })
//     .catch((err: Error) => {
//       return res.status(500).send({
//         message:
//           err.message || "Some error occurred while creating the User."
//       });
//     });

// }

// const getUser = async (req: Request, res: Response, next: NextFunction) => {
//   console.log('QUERY PARAM : ', req.query);
//   if(!req.query.id) throw new Error('Bad request exception : id is required');

//   const id = +req.query.id
//   const user = await userRepository.getUser(id);

//   return res.send(user);
// }

// const getUserByEmail = async (req: Request, res: Response, next: NextFunction) => {
//   if(!req.query.email) throw new Error('Bad request exception : email is required');

//   const email = req.query.email as unknown as string;
//   const user = await userRepository.getUserByEmail(email);

//   return res.send(user);
// }

// const userExists = async (req: Request, res: Response, next: NextFunction) => {
//   //Validator on body
//   if(!req.query.email) throw new Error('Bad request exception : email is required');

//   const email = req.query.email as unknown as string;

//   const userExists = await userRepository.userExists(email);
//   //Presenter 

//   if(userExists > 0 ) return res.send(true);

//   return res.send(false);
// }

// export = {
//   createUser,
//   getUser,
//   getUserByEmail,
//   userExists
// }