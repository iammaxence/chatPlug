import { UseCase } from "../../../common/UseCase";
import { Room } from "../../Room";

export class RoomUseCaseDto {

    public static toDto(room: {id: number, name: string}) {
        if(!room) return null;
        const { id, name } = room;
        
        return new Room(id, name);
    }

}