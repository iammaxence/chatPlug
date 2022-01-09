import { JoinRoomPort } from "../../../../domains/room/port/JoinRoomPort";

export class JoinRoomAdapter implements JoinRoomPort {
    roomId: number;
    userId: number;

    constructor({ roomId, userId }: { roomId: string, userId: string  }) {
        this.roomId = parseInt(roomId);
        this.userId = parseInt(userId);
    }

}