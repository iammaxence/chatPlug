import { NextFunction, Request, Response } from "express";
import { Op } from "sequelize/types";
import models from '../db/setup/initModels';
import { Message } from "../domain/Message";
import { User } from "../domain/User";

const { messageModel, userRoomModel, userModel } = models;

const createMessage = async (req: Request, res: Response, next: NextFunction) => {
  //Validator on body

  const { userId, text } = req.body;
  const message = { userId, text, date: new Date()}

  const responseMessage = await messageModel.create(message)
    .catch((err: Error) => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating a message."
    });
  });;
  
  res.send(responseMessage);
}

const getAllMessagesFromRoom = async (req: Request, res: Response, next: NextFunction) => {
  //Validator on body

  const { roomId } = req.query;
  
  const allUsersIdsInTheRoom = (await userRoomModel.findAll({
    where: { roomId },
    attributes: ['userId']
  })).map(({userId}: {userId: number}) => userId);

  const allMessagesFromRoom = (await messageModel.findAll({
    where: { userId : allUsersIdsInTheRoom },
    include: {
      model: userModel,
      as: 'user',
    },
    order: [['date', 'ASC']]
  })).map(({id, text, date, user}: { id: number, text: string, date: Date, user: {id: number, email: string, pseudo: string}}) => {
    const { id: userId, email, pseudo } = user
    const userFromDomain = new User(userId, email, pseudo);

    return new Message(id, text, date, userFromDomain)
  });
  
  res.send(allMessagesFromRoom);
}

export = {
  createMessage,
  getAllMessagesFromRoom,
}