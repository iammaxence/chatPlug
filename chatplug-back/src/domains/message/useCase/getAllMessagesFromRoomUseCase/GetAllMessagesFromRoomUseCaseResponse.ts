import { UseCaseResponse } from "../../../../common/UseCaseResponse";
import { Message } from "../../../Message";

export class GetAllMessagesFromRoomUseCaseResponse implements UseCaseResponse {
    status_code: number;
    error_message: string | null;
    allMessagesFromRoom: [Message] | [];

    constructor({status_code = 200, allMessagesFromRoom = [], error_message = null}: { status_code?: number, allMessagesFromRoom?: [Message] | [], error_message?: string|null }) {
        this.status_code = status_code;
        this.error_message = error_message;
        this.allMessagesFromRoom = allMessagesFromRoom;
    }

}