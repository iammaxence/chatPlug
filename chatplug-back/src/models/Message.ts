export default class Message {
  private id: number;
  private text: string;
  private date: string;
  
  constructor(id: number, text: string, date: string) {
    this.id = id;
    this.text = text;
    this.date = date;
  }
}