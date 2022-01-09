import models from '../../application/db/setup/initModels';
import { Room } from '../../domains/Room';
import { RoomUseCaseDto } from '../../domains/room/dto/RoomUseCaseDto';
import { User } from "../../domains/User";
const { userRoomModel, roomModel } = models;

export class RoomRepository {

  public async createRoom(roomName: string) {
    const responseRoom = await roomModel.create({ name: roomName });
    
    return RoomUseCaseDto.toDto(responseRoom);
  }

  public async joinRoom(roomId: number, userId:number) {
    const [room, created] = await userRoomModel.findOrCreate({ where: { roomId, userId }});
    
    return created;
  }

  public async roomExistsById(id: number) {
    const room = await roomModel.count({ where: {id}});
    return !!room;
  }

  public async findRoom(roomName: string) {
    
    return new Room(1, 'mock');
  }

  public async userHasJoinedRoom(roomId: number, userId:number) {
    
    return true;
  }

}

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