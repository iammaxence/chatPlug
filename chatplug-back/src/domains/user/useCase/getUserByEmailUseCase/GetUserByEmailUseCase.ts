import { ErrorAdapter } from "../../../../common/ErrorAdapter";
import { UseCase } from "../../../../common/UseCase";
import { UserRepository } from "../../../../infrastructure/repository/UserRepository";
import { GetUserByEmailPort } from "../../port/GetUserByEmailPort";
import { GetUserByEmailUseCaseResponse } from "./GetUserUseCaseByEmailResponse";

export class GetUserByEmailUseCase implements UseCase<GetUserByEmailPort,GetUserByEmailUseCaseResponse> {
    userRepository: UserRepository;

    constructor(userRepository: UserRepository){
        this.userRepository = userRepository;
    }

    async execute(port?: GetUserByEmailPort): Promise<GetUserByEmailUseCaseResponse> {
        const { email } = port!;

        if(!email) {
            const status_code = 400 
            const error_message =  ErrorAdapter.parameters(GetUserByEmailUseCase.name, [email]);
            return new GetUserByEmailUseCaseResponse({status_code, error_message})
        }
        const getUserByEmail = await this.userRepository.getUserByEmail(email);
              
        return new GetUserByEmailUseCaseResponse({ getUserByEmail })
    }
}