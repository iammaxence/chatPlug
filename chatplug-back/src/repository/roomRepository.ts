import models from '../db/setup/initModels';
import { User } from "../domain/User";
const { userRoomModel } = models;

const joinRoom = async (roomId: number, userId:number) => {
  const userRoom = { roomId, userId}

  const room = await userRoomModel.create(userRoom)
  if(!room) throw new Error(`Bad request exception : RoomId ${roomId} or UserId ${userId} doesnt exists`);

}

export = {
  joinRoom,
}