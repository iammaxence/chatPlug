import { UseCase } from "../../../../common/UseCase";
import { UseCaseResponse } from "../../../../common/UseCaseResponse";
import { Room } from "../../../Room";

export class CreateRoomUseCaseResponse implements UseCaseResponse {
    createdRoom: Room|null
    status_code: number;
    error_message: string | null;

    constructor({status_code = 200, createdRoom = null, error_message = null}: { status_code?: number, createdRoom?: Room|null, error_message?: string|null }) {
        this.status_code = status_code;
        this.error_message = error_message;
        this.createdRoom=createdRoom;
    }

    
}