import { ResponseHandler } from "../../common/ResponseHandler";
import { CreateRoomUseCase } from "../../domains/room/useCase/CreateRoomUseCase/CreateRoomUseCase";
import { FindRoomUseCase } from "../../domains/room/useCase/findRoomUseCase/FindRoomUseCase";
import { JoinRoomUseCase } from "../../domains/room/useCase/joinRoomUseCase/JoinRoomUseCase";
import { CreateUserUseCase } from "../../domains/user/useCase/createUserUseCase/CreateUserUseCase";
import { GetUserByEmailUseCase } from "../../domains/user/useCase/getUserByEmailUseCase/GetUserByEmailUseCase";
import { GetUserUseCase } from "../../domains/user/useCase/getUserUseCase/GetUserUsecase";
import { UserExistsUseCase } from "../../domains/user/useCase/userExistsUseCase/UserExistsUseCase";
import { RoomRepository } from "../../infrastructure/repository/RoomRepository";
import { UserRepository } from "../../infrastructure/repository/UserRepository";
import { RoomController } from "./RoomController";
import { SocketController } from "./SocketController";
import { UserController } from "./UserController";

//Response handler
const responseHandler = new ResponseHandler();

//Repository
const userRepository = new UserRepository();
const roomRepository = new RoomRepository();

//user use case
const createUserUseCase = new CreateUserUseCase(userRepository);
const getUserUseCase = new GetUserUseCase(userRepository);
const getUserByEmailUseCase = new GetUserByEmailUseCase(userRepository);
const userExistsUseCase = new UserExistsUseCase(userRepository);

//room use case
const createRoomUseCase = new CreateRoomUseCase(roomRepository);
const joinRoomUseCase = new JoinRoomUseCase(roomRepository, userRepository);
const findRoomUseCase = new FindRoomUseCase(roomRepository);

// Controller
const socketController = new SocketController(
    userRepository,
    roomRepository,
)

const userController = new UserController(
    responseHandler,
    createUserUseCase,
    getUserUseCase,
    getUserByEmailUseCase,
    userExistsUseCase,
);

const roomController = new RoomController(
    responseHandler,
    createRoomUseCase,
    joinRoomUseCase,
    findRoomUseCase,
);

export = {
    userController,
    roomController,
    socketController,
}