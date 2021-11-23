export class User {
  private id: number;
  private name: string;
  private pseudo: string;

  constructor(id: number, name: string, pseudo: string) {
    this.id = id;
    this.name = name;
    this.pseudo = pseudo;
  }

  getId(): number {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getPseudo(): string {
    return this.pseudo;
  }
}