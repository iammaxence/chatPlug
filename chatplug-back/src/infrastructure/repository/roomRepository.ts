import models from '../../application/db/setup/initModels';
import { Room } from '../../domains/Room';
import { RoomUseCaseDto } from '../../domains/room/dto/RoomUseCaseDto';
import { User } from "../../domains/User";
const { userRoomModel, roomModel } = models;

export class RoomRepository {

  public static async createRoom(roomName: string) {
    const responseRoom = await roomModel.create({ name: roomName });
    
    return RoomUseCaseDto.toDto(responseRoom);
  }

  public static async joinRoom(roomId: number, userId:number) {
    
    return;
  }

  public static async findRoom(roomName: string) {
    
    return new Room(1, 'mock');
  }

  public static async userHasJoinedRoom(roomId: number, userId:number) {
    
    return true;
  }

}

// const joinRoom = async (roomId: number, userId:number) => {
//   const userRoom = { roomId, userId}

//   const room = await userRoomModel.create(userRoom)
//   if(!room) throw new Error(`Bad request exception : RoomId ${roomId} or UserId ${userId} doesnt exists`);

// }

// const userHasJoinedRoom =  async (roomId: number, userId:number) => {
//   const userRoom = { roomId, userId}

//   const room = await userRoomModel.count({
//     where: {
//       roomId,
//       userId
//     }
//   })

//   return !!room; 
// }

// const findRoom = async (roomName: string) => {

//   const room = await roomModel.findOne({ where : { name: roomName } });
//   return new Room(room.id, room.name);
// }


// export = {
//   joinRoom,
//   userHasJoinedRoom,
//   findRoom,
// }