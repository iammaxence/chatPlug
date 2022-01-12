import { Message } from "../../Message";
import { User } from "../../User";

export class MessageUseCaseDto {

    public static toDto(message: {id: number, text: string, date: Date, user: User}) {
        if(!message) return null;
        const { id, text, date, user } = message;
        
        return new Message(id, text, date, user);
    }
}