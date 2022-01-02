import { UseCaseResponse } from "../../../../common/UseCaseResponse";
import { User } from "../../../User";

export class CreateUserUseCaseResponse implements UseCaseResponse {
    status_code: number;
    createdUser: User|null;
    error_message: string|null;

    constructor({status_code = 200, createdUser = null, error_message = null}: { status_code?: number, createdUser?: User|null, error_message?: string|null }) {
        this.status_code = status_code;
        this.error_message = error_message;
        this.createdUser = createdUser;
    }
}