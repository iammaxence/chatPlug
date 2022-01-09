import { ErrorAdapter } from "../../../../common/ErrorAdapter";
import { UseCase } from "../../../../common/UseCase";
import { UserRepository } from "../../../../infrastructure/repository/UserRepository";
import { UserUseCaseDto } from "../../dto/UserUseCaseDto";
import { CreateUserPort } from "../../port/CreateUserPort";
import { CreateUserUseCaseResponse } from "./CreateUserUseCaseResponse";

export class CreateUserUseCase implements UseCase<CreateUserPort, UserUseCaseDto> {
    userRepository: UserRepository;

    constructor(userRepository: UserRepository){
        this.userRepository = userRepository;
    }

    async execute(port?: CreateUserPort): Promise<CreateUserUseCaseResponse> {
        const { email , pseudo , status } = port!;

        if(!email || !pseudo) {
            const status_code = 400 
            const error_message =  ErrorAdapter.parameters(CreateUserUseCase.name, [email, pseudo, status]);
            return new CreateUserUseCaseResponse({status_code, error_message})
        }
        const createdUser = await this.userRepository.createUser(email, pseudo, status);
              
        return new CreateUserUseCaseResponse({ createdUser })
    }
}