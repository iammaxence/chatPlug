import { ErrorAdapter } from "../../../../common/ErrorAdapter";
import { UseCase } from "../../../../common/UseCase";
import { RoomRepository } from "../../../../infrastructure/repository/RoomRepository";
import { FindRoomPort } from "../../port/FindRoomPort";
import { FindRoomUseCaseResponse } from "./FindRoomUseCaseResponse";

export class FindRoomUseCase implements UseCase<FindRoomPort, FindRoomUseCaseResponse> {
    roomRepository: RoomRepository;

    constructor(roomRepository: RoomRepository) {
        this.roomRepository = roomRepository;
    }

    async execute(port?: FindRoomPort): Promise<FindRoomUseCaseResponse> {
        const { roomName } = port!;

        if(!roomName) {
            const status_code = 400 
            const error_message =  ErrorAdapter.parameters(FindRoomUseCase.name, [roomName]);
            return new FindRoomUseCaseResponse({status_code, error_message})
        }
        const findRoom = await this.roomRepository.findRoom(roomName);
              
        return new FindRoomUseCaseResponse({ findRoom })
    }
}