import { ErrorAdapter } from "../../../../common/ErrorAdapter";
import { UseCase } from "../../../../common/UseCase";
import userRepository from "../../../../infrastructure/repository/userRepository";
import { GetUserPort } from "../../port/GetUserPort";
import { GetUserUseCaseResponse } from "./GetuserUseCaseResponse";

export class GetUserUseCase implements UseCase<GetUserPort,GetUserUseCaseResponse> {
    async execute(port?: GetUserPort): Promise<GetUserUseCaseResponse> {
        const { id } = port!;

        if(!id) {
            const status_code = 400 
            const error_message =  ErrorAdapter.parameters(GetUserUseCase.name, [id]);
            return new GetUserUseCaseResponse({status_code, error_message})
        }
        const getUser = await userRepository.getUser(id);
              
        return new GetUserUseCaseResponse({ getUser })
    }
}