import { UseCaseResponse } from "../../../../common/UseCaseResponse";
import { Message } from "../../../Message";

export class CreateMessageUseCaseResponse implements UseCaseResponse {
    status_code: number;
    error_message: string | null;
    createdMessage: Message | null;

    constructor({status_code = 200, createdMessage = null, error_message = null}: { status_code?: number, createdMessage?: Message|null, error_message?: string|null }) {
        this.status_code = status_code;
        this.error_message = error_message;
        this.createdMessage = createdMessage;
    }

}