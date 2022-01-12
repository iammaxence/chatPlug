import express from 'express';
import controllers from '../controllers';
import { NextFunction, Request, Response } from "express";

// const { createMessage, getAllMessagesFromRoom }  = require('../controllers/messageController');

const messageRoute = express.Router();
const { messageController } = controllers; 

messageRoute.post('/create-message', (req: Request, res: Response) => {
    return messageController.createMessage(req, res);
});

// messageRoute.get('/room-messages', getAllMessagesFromRoom);

export = messageRoute;