import { ErrorAdapter } from "../../../../common/ErrorAdapter";
import { UseCase } from "../../../../common/UseCase";
import { UserRepository } from "../../../../infrastructure/repository/UserRepository";
import { UserExistsPort } from "../../port/UserExistsPort";
import { UserExistsUseCaseResponse } from "./UserExistsUseCaseResponse";

export class UserExistsUseCase implements UseCase<UserExistsPort,UserExistsUseCaseResponse> {
    userRepository: UserRepository;

    constructor(userRepository: UserRepository){
        this.userRepository = userRepository;
    }
    
    async execute(port?: UserExistsPort): Promise<UserExistsUseCaseResponse> {
        const { email } = port!;

        if(!email) {
            const status_code = 400 
            const error_message =  ErrorAdapter.parameters(UserExistsUseCase.name, [email]);
            return new UserExistsUseCaseResponse({status_code, error_message})
        }
        const userExists = await this.userRepository.userExistsByEmail(email);
              
        return new UserExistsUseCaseResponse({ userExists })
    }
}