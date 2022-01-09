import { UseCase } from "../../../../common/UseCase";
import { UseCaseResponse } from "../../../../common/UseCaseResponse";
import { Room } from "../../../Room";

export class JoinRoomUseCaseResponse implements UseCaseResponse {
    joinRoom: boolean|null
    status_code: number;
    error_message: string | null;

    constructor({status_code = 200, joinRoom = null, error_message = null}: { status_code?: number, joinRoom?: boolean|null, error_message?: string|null }) {
        this.status_code = status_code;
        this.error_message = error_message;
        this.joinRoom=joinRoom;
    }

    
}