import { errorMonitor } from "events";
import { ErrorAdapter } from "../../../../common/ErrorAdapter";
import { ErrorUseCase } from "../../../../common/ErrorUseCase";
import { UseCase } from "../../../../common/UseCase";
import { RoomRepository } from "../../../../infrastructure/repository/RoomRepository";
import { UserRepository } from "../../../../infrastructure/repository/UserRepository";
import { JoinRoomPort } from "../../port/JoinRoomPort";
import { JoinRoomUseCaseResponse } from "./JoinRoomUseCaseResponse";

export class JoinRoomUseCase implements UseCase<JoinRoomPort, JoinRoomUseCaseResponse> {

    roomRepository: RoomRepository;
    userRepository: UserRepository;

    constructor(roomRepository: RoomRepository, userRepository: UserRepository) {
        this.roomRepository = roomRepository;
        this.userRepository = userRepository;
    }

    async execute(port?: JoinRoomPort): Promise<JoinRoomUseCaseResponse> {
        const { roomId, userId } = port!;
        this.checkParameters(port);

        const userExists = await this.userRepository.userExistsById(userId);
        const roomExists = await this.roomRepository.roomExistsById(roomId);

        if(!userExists) {
            return this.userDoNotExists(userId);
        } else if (!roomExists) {
            return this.roomDoNotExists(roomId);
        } else {
            return this.userAndRoomDoExists(userId, roomId);
        }
    }

    checkParameters(port?: JoinRoomPort) {
        const { roomId, userId } = port!;

        if(!roomId || !userId) {
            const status_code = 400 
            const error_message =  ErrorAdapter.parameters(JoinRoomUseCase.name, [roomId, userId]);
            return new JoinRoomUseCaseResponse({status_code, error_message})
        }
    }

    userDoNotExists(userId: number) {
        const status_code = 404 
        const error_message =  ErrorUseCase.doNotExists(JoinRoomUseCase.name, 'userDoNotExists', [userId] );
        return new JoinRoomUseCaseResponse({status_code, error_message})
    }

    roomDoNotExists(roomId: number) {
        const status_code = 404 
        const error_message =  ErrorUseCase.doNotExists(JoinRoomUseCase.name, 'roomDoNotExists', [roomId] );
        return new JoinRoomUseCaseResponse({status_code, error_message})
    }

    async userAndRoomDoExists(userId: number, roomId: number) {
        const joinRoom = await this.roomRepository.joinRoom(roomId, userId);
        return new JoinRoomUseCaseResponse({ joinRoom })
    }
}