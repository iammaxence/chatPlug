export class User {
  private id: number;
  private pseudo: string;
  private status: string;

  constructor(id: number, pseudo: string, status: string) {
    this.id = id;
    this.pseudo = pseudo;
    this.status = status;
  }

  getId(): number {
    return this.id;
  }

  
  getPseudo(): string {
    return this.pseudo;
  }

  getStatus(): string {
    return this.status;
  }

}