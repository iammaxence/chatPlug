import { FindRoomPort } from "../../../../domains/room/port/FindRoomPort";

export class FindRoomAdapter implements FindRoomPort {
    roomName: string;

    constructor({ roomName }: { roomName: string }) {
        this.roomName = roomName;
    }

}