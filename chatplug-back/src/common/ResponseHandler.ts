import { Response } from "express";
import { CreateUserUseCaseResponse } from "../domains/user/useCase/createUserUseCase/CreateUserUseCaseResponse";
import { UseCaseResponse } from "./UseCaseResponse";

export class ResponseHandler {

    error(res: Response , response: UseCaseResponse) {
        return res
        .status(response.status_code)
        .send(response.error_message);
    }
}