import { User } from "../../User";

export class UserUseCaseDto {

    public static toDto(user: {id: number, pseudo: string, status: string}){
        if (!user) return null;
        const {id, pseudo, status} = user;
        
        return new User(id, pseudo, status);
    }
}