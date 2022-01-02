import { GetUserByEmailPort } from "../../../../domains/user/port/GetUserByEmailPort";

export class GetUserByEmailAdapter implements GetUserByEmailPort {
    email: string;

    constructor({email}: {email: string}) {
        this.email = email;
    }

}