import express from 'express';
import { NextFunction, Request, Response } from "express";
import controllers from '../controllers/index';

const userRoute = express.Router();
const { userController } = controllers; 

console.log('createUserUseCase ', userController);

userRoute.post('/create-user', (req: Request, res: Response, next: NextFunction) => {
   return userController.createUser(req, res);
});

userRoute.get('/get-user', (req: Request, res: Response, next: NextFunction) => {
   return userController.getUser(req, res);
});

userRoute.get('/getUserByEmail', userController.getUserByEmail);

userRoute.get('/exists', userController.userExists);

export = userRoute;