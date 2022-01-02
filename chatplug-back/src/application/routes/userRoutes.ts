import express from 'express';
import { NextFunction, Request, Response } from "express";
import controllers from '../controllers/index';

const userRoute = express.Router();
const { userController } = controllers; 

userRoute.post('/create-user', (req: Request, res: Response, next: NextFunction) => {
   return userController.createUser(req, res);
});

userRoute.get('/get-user', (req: Request, res: Response, next: NextFunction) => {
   return userController.getUser(req, res);
});

userRoute.get('/get-user-by-email', (req: Request, res: Response, next: NextFunction) => {
   return userController.getUserByEmail(req, res);
});

userRoute.get('/user-exists', (req: Request, res: Response, next: NextFunction) => {
   return userController.userExists(req, res);
});


export = userRoute;