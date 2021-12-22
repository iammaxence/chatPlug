import models from '../../application/db/setup/initModels';
import { Room } from '../../domains/Room';
import { User } from "../../domains/User";
const { userRoomModel, roomModel } = models;

const joinRoom = async (roomId: number, userId:number) => {
  const userRoom = { roomId, userId}

  const room = await userRoomModel.create(userRoom)
  if(!room) throw new Error(`Bad request exception : RoomId ${roomId} or UserId ${userId} doesnt exists`);

}

const userHasJoinedRoom =  async (roomId: number, userId:number) => {
  const userRoom = { roomId, userId}

  const room = await userRoomModel.count({
    where: {
      roomId,
      userId
    }
  })

  return !!room; 
}

const findRoom = async (roomName: string) => {

  const room = await roomModel.findOne({ where : { name: roomName } });
  return new Room(room.id, room.name);
}


export = {
  joinRoom,
  userHasJoinedRoom,
  findRoom,
}