import { ErrorAdapter } from "../../../../common/ErrorAdapter";
import { UseCase } from "../../../../common/UseCase";
import userRepository from "../../../../infrastructure/repository/userRepository";
import { UserExistsPort } from "../../port/UserExistsPort";
import { UserExistsUseCaseResponse } from "./UserExistsUseCaseResponse";

export class UserExistsUseCase implements UseCase<UserExistsPort,UserExistsUseCaseResponse> {
    async execute(port?: UserExistsPort): Promise<UserExistsUseCaseResponse> {
        const { email } = port!;

        if(!email) {
            const status_code = 400 
            const error_message =  ErrorAdapter.parameters(UserExistsUseCase.name, [email]);
            return new UserExistsUseCaseResponse({status_code, error_message})
        }
        const userExists = await userRepository.userExists(email);
              
        return new UserExistsUseCaseResponse({ userExists })
    }
}