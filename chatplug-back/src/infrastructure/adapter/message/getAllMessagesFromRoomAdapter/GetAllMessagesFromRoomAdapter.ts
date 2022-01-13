import { GetAllMessagesFromRoomPort } from "../../../../domains/message/port/GetAllMessagesFromRoomPort";

export class GetAllMessagesFromRoomAdapter implements GetAllMessagesFromRoomPort {
    roomId: number;

    constructor({ roomId }: { roomId: string }) {
        this.roomId = parseInt(roomId);
    }
}