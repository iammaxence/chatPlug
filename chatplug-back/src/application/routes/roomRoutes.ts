import express from 'express';
import controllers from '../controllers';
import { NextFunction, Request, Response } from "express";
const { createRoom, joinRoom, findRoom }  = require('../controllers/roomController');

const roomRoute = express.Router();
const { roomController } = controllers; 

roomRoute.post('/create-room', (req: Request, res: Response, next: NextFunction) => {
    return roomController.createRoom(req, res);
});

roomRoute.post('/join-room', (req: Request, res: Response, next: NextFunction) => {
    return roomController.joinRoom(req, res);
});

// roomRoute.get('/get-room', findRoom);

export = roomRoute;