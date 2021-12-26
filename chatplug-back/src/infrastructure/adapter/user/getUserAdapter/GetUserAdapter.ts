import { GetUserPort } from "../../../../domains/user/port/GetUserPort";

export class GetUserAdapter implements GetUserPort{
    id: number;

    constructor({id}: {id: string}) {
        this.id = parseInt(id);
    }

}