import { CreateRoomPort } from "../../../../domains/room/port/CreateRoomPort";

export class CreateRoomAdapter implements CreateRoomPort {
    roomName: string;

    constructor({ roomName }: { roomName: string }) {
        this.roomName = roomName;
    }

}