import { UseCaseResponse } from "../../../../common/UseCaseResponse";
import { Room } from "../../../Room";

export class FindRoomUseCaseResponse implements UseCaseResponse{
    status_code: number;
    error_message: string | null;
    findRoom: Room | null

    constructor({status_code = 200, findRoom = null, error_message = null}: { status_code?: number, findRoom?: Room|null, error_message?: string|null }) {
        this.status_code = status_code;
        this.error_message = error_message;
        this.findRoom=findRoom;
    }

}