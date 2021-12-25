//controller
import { CreateUserUseCase } from "../../domains/user/useCase/createUserUseCase/CreateUserUseCase";
import { UserController } from "./UserController";

//user case

const userController = new UserController(new CreateUserUseCase);

export = {
    userController,
}