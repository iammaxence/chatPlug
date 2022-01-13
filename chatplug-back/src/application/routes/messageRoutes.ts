import express from 'express';
import controllers from '../controllers';
import { Request, Response } from "express";

const messageRoute = express.Router();
const { messageController } = controllers; 

messageRoute.post('/create-message', (req: Request, res: Response) => {
    return messageController.createMessage(req, res);
});

messageRoute.get('/room-messages', (req: Request, res: Response) => {
    return messageController.getAllMessagesFromRoom(req, res);
});


export = messageRoute;