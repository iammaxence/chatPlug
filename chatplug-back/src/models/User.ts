export default class User {
  private id: number;
  private email: string;
  private pseudo: string;
  private status: string;
  
  constructor(id: number, email: string, status="PENDING") {
    this.id = id;
    this.email = email;
    this.pseudo = '';
    this.status = status;
  }

  getId(): number {
    return this.id;
  }

  getName(): string {
    return this.pseudo;
  }
}