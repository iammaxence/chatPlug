import { CreateUserPort } from "../../../../domains/user/port/CreateUserPort";

export class CreateUserAdapter implements CreateUserPort{
    email: string;
    pseudo: string;
    status: string;

    constructor({email, pseudo, status}: {email: string, pseudo: string, status: string}) {
        this.email = email;
        this.pseudo = pseudo;
        this.status = status;
    }

}