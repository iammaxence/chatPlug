import { User } from "./User";

export class Message {
  private id: number;
  private text: string;
  private date: Date;
  private user: User;

  constructor(id: number, text: string, date: Date, user: User) {
    this.id = id;
    this.text = text;
    this.date = date;
    this.user = user;
  }

  getId(): number {
    return this.id;
  }

  getText(): string {
    return this.text;
  }

  getDate(): Date {
    return this.date;
  }

  getUser(): User {
    return this.user;
  }
}