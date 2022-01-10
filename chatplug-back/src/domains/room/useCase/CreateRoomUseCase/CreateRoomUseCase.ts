import { ErrorAdapter } from "../../../../common/ErrorAdapter";
import { UseCase } from "../../../../common/UseCase";
import { RoomRepository } from "../../../../infrastructure/repository/RoomRepository";
import { RoomUseCaseDto } from "../../dto/RoomUseCaseDto";
import { CreateRoomPort } from "../../port/CreateRoomPort";
import { CreateRoomUseCaseResponse } from "./CreateRoomUseCaseResponse";

export class CreateRoomUseCase implements UseCase<CreateRoomPort, RoomUseCaseDto> {
    roomRepository: RoomRepository;

    constructor(roomRepository: RoomRepository) {
        this.roomRepository = roomRepository;
    }

    async execute(port?: CreateRoomPort): Promise<CreateRoomUseCaseResponse> {
        const { roomName } = port!;

        if(!roomName) {
            const status_code = 400 
            const error_message =  ErrorAdapter.parameters(CreateRoomUseCase.name, [roomName]);
            return new CreateRoomUseCaseResponse({status_code, error_message})
        }
        const createdRoom = await this.roomRepository.createRoom(roomName);
              
        return new CreateRoomUseCaseResponse({ createdRoom })
    }
}