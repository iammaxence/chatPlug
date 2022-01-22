import models from '../../application/db/setup/initModels';
import { Room } from '../../domains/Room';
import { RoomUseCaseDto } from '../../domains/room/dto/RoomUseCaseDto';
import { User } from "../../domains/User";
const { userRoomModel, roomModel } = models;

export class RoomRepository {

  public async createRoom(roomName: string): Promise<Room|null> {
    const responseRoom = await roomModel.create({ name: roomName });
    
    return RoomUseCaseDto.toDto(responseRoom);
  }

  public async joinRoom(roomId: number, userId:number): Promise<boolean> {
    const [room, created] = await userRoomModel.findOrCreate({ where: { roomId, userId }});
    
    return created;
  }

  public async roomExistsById(id: number): Promise<boolean> {
    const room = await roomModel.count({ where: { id }});
    return !!room;
  }

  public async findRoom(roomName: string): Promise<Room|null> {
    const responseRoom = await roomModel.findOne({ where : { name: roomName } });
    return RoomUseCaseDto.toDto(responseRoom);
  }

  public async userHasJoinedRoom(roomId: number, userId:number): Promise<boolean> {

    const room = await userRoomModel.count({
      where: {
        roomId,
        userId
      }
    })

    return !!room; 
  }

}