import { User } from "../../../User";
import { UserUseCaseDto } from "../../dto/UserUseCaseDto";

export class CreateUserUseCaseResponse {
    status_code: number;
    createdUser: UserUseCaseDto|null;
    error_message: string|null;

    constructor({status_code = 200, createdUser = null, error_message = null}: { status_code?: number, createdUser?: UserUseCaseDto|null, error_message?: string|null }) {
        this.status_code = status_code;
        this.error_message = error_message;
        this.createdUser = createdUser;
    }
}