import { NextFunction, Request, Response } from "express";
import models from '../db/setup/initModels';
import userRepository from "../../infrastructure/repository/userRepository";

const { userModel } = models;

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  //Validator on body

  //User to create
  const {email, pseudo, status} = req.body;

  // Save Tutorial in the database
  userModel.create({ email, pseudo, status })
    .then((data: any) => {
      //Presenter 
      res.send(data);
    })
    .catch((err: Error) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    });
}

const getUser = async (req: Request, res: Response, next: NextFunction) => {
  if(!req.query.id) throw new Error('Bad request exception : id is required');

  const id = +req.query.id
  const user = await userRepository.getUser(id);

  res.send(user);
}

const userExists = async (req: Request, res: Response, next: NextFunction) => {
  //Validator on body
  if(!req.query.email) throw new Error('Bad request exception : email is required');
  
  const email = req.query.email as unknown as string;

  const userExists = await userRepository.userExists(email);
  
  //Presenter 

  if(userExists > 0 ) res.send(true);

  res.send(false);
}

export = {
  createUser,
  getUser,
  userExists
}