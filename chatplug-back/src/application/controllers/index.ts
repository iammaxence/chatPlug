import { ResponseHandler } from "../../common/ResponseHandler";
import { CreateUserUseCase } from "../../domains/user/useCase/createUserUseCase/CreateUserUseCase";
import { GetUserByEmailUseCase } from "../../domains/user/useCase/getUserByEmailUseCase/GetUserByEmailUseCase";
import { GetUserUseCase } from "../../domains/user/useCase/getUserUseCase/GetUserUsecase";
import { UserExistsUseCase } from "../../domains/user/useCase/userExistsUseCase/UserExistsUseCase";
import { UserController } from "./UserController";

//Response handler
const responseHandler = new ResponseHandler();

//user use case
const createUserUseCase = new CreateUserUseCase();
const getUserUseCase = new GetUserUseCase();
const getUserByEmailUseCase = new GetUserByEmailUseCase();
const userExistsUseCase = new UserExistsUseCase();

// Controller
const userController = new UserController(
    responseHandler,
    createUserUseCase,
    getUserUseCase,
    getUserByEmailUseCase,
    userExistsUseCase,
);

export = {
    userController,
}