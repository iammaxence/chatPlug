import { UseCaseResponse } from "../../../../common/UseCaseResponse";
export class UserExistsUseCaseResponse implements UseCaseResponse {
    status_code: number;
    userExists: boolean;
    error_message: string|null;

    constructor({status_code = 200, userExists = false, error_message = null}: { status_code?: number, userExists?:boolean, error_message?: string|null }) {
        this.status_code = status_code;
        this.error_message = error_message;
        this.userExists = userExists;
    }
}