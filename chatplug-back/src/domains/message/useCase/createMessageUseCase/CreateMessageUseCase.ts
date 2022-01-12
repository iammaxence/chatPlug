import { ErrorAdapter } from "../../../../common/ErrorAdapter";
import { ErrorUseCase } from "../../../../common/ErrorUseCase";
import { UseCase } from "../../../../common/UseCase";
import { MessageRepository } from "../../../../infrastructure/repository/MessageRepository";
import { RoomRepository } from "../../../../infrastructure/repository/RoomRepository";
import { UserRepository } from "../../../../infrastructure/repository/UserRepository";
import { CreateMessagePort } from "../../port/CreateMessagePort";
import { CreateMessageUseCaseResponse } from "./CreateMessageUseCaseResponse";

export class CreateMessageUseCase implements UseCase<CreateMessagePort, CreateMessageUseCaseResponse> {
    messageRepository: MessageRepository;
    userRepository: UserRepository;
    roomRepository: RoomRepository;

    constructor(messageRepository: MessageRepository, userRepository: UserRepository, roomRepository: RoomRepository) {
        this.messageRepository = messageRepository;
        this.userRepository = userRepository;
        this.roomRepository = roomRepository;
    }

    async execute(port?: CreateMessagePort): Promise<CreateMessageUseCaseResponse> {
        const { roomId, userId, text } = port!;
        this.checkParameters(port);

        const userExists = await this.userRepository.userExistsById(userId);
        const roomExists = await this.roomRepository.roomExistsById(roomId);

        if(!userExists) {
            this.userDoNotExists(userId);
        } else if(roomExists) {
            this.roomDoNotExists(roomId);
        } else {

        }

        if(!userId || !roomId || !text) {
            const status_code = 400 
            const error_message =  ErrorAdapter.parameters(CreateMessageUseCase.name, [userId, roomId, text]);
            return new CreateMessageUseCaseResponse({status_code, error_message});
        }
        const createdMessage = await this.messageRepository.createMessage(userId, roomId, text);
              
        return new CreateMessageUseCaseResponse({ createdMessage });
    }

    checkParameters(port?: CreateMessagePort) {
        const { roomId, userId, text } = port!;

        if(!roomId || !userId || text) {
            const status_code = 400 
            const error_message =  ErrorAdapter.parameters(CreateMessageUseCase.name, [roomId, userId, text]);
            return new CreateMessageUseCaseResponse({status_code, error_message})
        }
    }

    userDoNotExists(userId: number) {
        const status_code = 404 
        const error_message =  ErrorUseCase.doNotExists(CreateMessageUseCase.name, 'userDoNotExists', [userId] );
        return new CreateMessageUseCaseResponse({status_code, error_message})
    }

    roomDoNotExists(roomId: number) {
        const status_code = 404 
        const error_message =  ErrorUseCase.doNotExists(CreateMessageUseCase.name, 'roomDoNotExists', [roomId] );
        return new CreateMessageUseCaseResponse({status_code, error_message})
    }
    
}