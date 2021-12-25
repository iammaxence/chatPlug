import { User } from "../../User";

export class UserUseCaseDto {

    public static toDto({id, pseudo, status}: {id: number, pseudo: string, status: string}){
        return new User(id, pseudo, status);
    }
}