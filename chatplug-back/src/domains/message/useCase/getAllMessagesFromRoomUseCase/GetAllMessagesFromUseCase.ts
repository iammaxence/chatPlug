import { ErrorAdapter } from "../../../../common/ErrorAdapter";
import { ErrorUseCase } from "../../../../common/ErrorUseCase";
import { UseCase } from "../../../../common/UseCase";
import { MessageRepository } from "../../../../infrastructure/repository/MessageRepository";
import { RoomRepository } from "../../../../infrastructure/repository/RoomRepository";
import { UserRepository } from "../../../../infrastructure/repository/UserRepository";
import { GetAllMessagesFromRoomPort } from "../../port/GetAllMessagesFromRoomPort";
import { GetAllMessagesFromRoomUseCaseResponse } from "./GetAllMessagesFromRoomUseCaseResponse";

export class GetAllMessagesFromRoomUseCase implements UseCase<GetAllMessagesFromRoomPort, GetAllMessagesFromRoomUseCaseResponse> {
    messageRepository: MessageRepository;
    roomRepository: RoomRepository;

    constructor(messageRepository: MessageRepository, roomRepository: RoomRepository) {
        this.messageRepository = messageRepository;
        this.roomRepository = roomRepository;
    }

    async execute(port?: GetAllMessagesFromRoomPort): Promise<GetAllMessagesFromRoomUseCaseResponse> {
        const { roomId} = port!;
        this.checkParameters(port);

        const roomExists = await this.roomRepository.roomExistsById(roomId);

        if(!roomExists) {
            return this.roomDoNotExists(roomId);
        } else {
            const allMessagesFromRoom = await this.messageRepository.getAllMessagesFromRoomId(roomId);
            return new GetAllMessagesFromRoomUseCaseResponse({ allMessagesFromRoom });
        }

              
    }

    checkParameters(port?: GetAllMessagesFromRoomPort) {
        const { roomId } = port!;

        if(!roomId) {
            const status_code = 400 
            const error_message =  ErrorAdapter.parameters(GetAllMessagesFromRoomUseCase.name, [roomId]);
            return new GetAllMessagesFromRoomUseCaseResponse({status_code, error_message})
        }
    }

    roomDoNotExists(roomId: number) {
        const status_code = 404 
        const error_message =  ErrorUseCase.doNotExists(GetAllMessagesFromRoomUseCase.name, 'roomDoNotExists', [roomId] );
        return new GetAllMessagesFromRoomUseCaseResponse({status_code, error_message})
    }
    
}