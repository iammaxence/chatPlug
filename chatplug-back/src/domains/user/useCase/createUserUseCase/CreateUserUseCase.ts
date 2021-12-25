import { UseCase } from "../../../../common/UseCase";
import userRepository from "../../../../infrastructure/repository/userRepository";
import { UserUseCaseDto } from "../../dto/UserUseCaseDto";
import { CreateUserPort } from "../../port/CreateUserPort";

export class CreateUserUseCase implements UseCase<CreateUserPort, UserUseCaseDto> {

    execute(port?: CreateUserPort): Promise<UserUseCaseDto> {

        if(!port) throw new Error('Parameters error for created user');

        const { email , pseudo , status } = port;

        return userRepository.createUser(email, pseudo, status);
    }
}