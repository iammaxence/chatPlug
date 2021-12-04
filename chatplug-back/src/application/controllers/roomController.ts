import { NextFunction, Request, Response } from "express";
import models from '../db/setup/initModels';

const { roomModel, userRoomModel } = models;

const createRoom = async (req: Request, res: Response, next: NextFunction) => {
  //Validator on body

  const { name } = req.body;
  const room = { name }

  const responseRoom = await roomModel.create(room)
    .catch((err: Error) => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating a room."
    });
  });;
  
  res.send(responseRoom);
}

const joinRoom = async (req: Request, res: Response, next: NextFunction) => {
  //Validator on body

  const { roomId, userId } = req.body;
  const userRoom = { roomId, userId}

  const responseRoom = await userRoomModel.create(userRoom)
    .catch((err: Error) => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while user joining room"
    });
  });;
  
  res.send(responseRoom);
}

export = {
  createRoom,
  joinRoom,
}