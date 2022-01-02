import { UserExistsPort } from "../../../../domains/user/port/UserExistsPort";

export class UserExistsAdapter implements UserExistsPort {
    email: string;

    constructor({email}: {email: string}) {
        this.email = email; 
    }

}