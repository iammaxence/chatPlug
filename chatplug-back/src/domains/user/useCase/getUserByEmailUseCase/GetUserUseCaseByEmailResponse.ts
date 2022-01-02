import { UseCaseResponse } from "../../../../common/UseCaseResponse";
import { User } from "../../../User";

export class GetUserByEmailUseCaseResponse implements UseCaseResponse {
    status_code: number;
    getUserByEmail: User|null;
    error_message: string|null;

    constructor({status_code = 200, getUserByEmail = null, error_message = null}: { status_code?: number, getUserByEmail?: User|null, error_message?: string|null }) {
        this.status_code = status_code;
        this.error_message = error_message;
        this.getUserByEmail = getUserByEmail;
    }
}