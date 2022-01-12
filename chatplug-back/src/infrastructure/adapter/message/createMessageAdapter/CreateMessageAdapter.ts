import { CreateMessagePort } from "../../../../domains/message/port/CreateMessagePort";

export class CreateMessageAdapter implements CreateMessagePort {
    userId: number;
    roomId: number;
    text: string;

    constructor({ userId, roomId, text }: { userId: string, roomId: string, text: string }) {
        this.userId = parseInt(userId);
        this.roomId = parseInt(roomId);
        this.text = text;
    }
}