import { ResponseHandler } from "../../common/ResponseHandler";
import { CreateUserUseCase } from "../../domains/user/useCase/createUserUseCase/CreateUserUseCase";
import { GetUserUseCase } from "../../domains/user/useCase/getUserUseCase/GetUserUsecase";
import { UserController } from "./UserController";

//Response handler
const responseHandler = new ResponseHandler();

//user use case
const createUserUseCase = new CreateUserUseCase();
const getUserUseCase = new GetUserUseCase();

// Controller
const userController = new UserController(
    responseHandler,
    createUserUseCase,
    getUserUseCase
);

export = {
    userController,
}