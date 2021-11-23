import axios from "axios";
import { Message } from "../domain/user/Message";
import { User } from "../domain/user/User";

/** Register user in database */
const getAllMessagesFromRoom = async (roomId: number) => {
    const allMessagesFromRoomResponse = await axios
        .get<{ id: number, text: string, date: Date, user: {id: number, name:string, pseudo:string}}[]>("http://localhost:8090/message/room-messages?roomId="+roomId);
    console.log('Response message : ', allMessagesFromRoomResponse);
    const allMessagesFromRoom = allMessagesFromRoomResponse.data
        .map(({ id, text, date, user}) => {
            const userBuilt = new User(user.id, user.name, user.pseudo); 
           return new Message(id, text, date, userBuilt);
        });

    return allMessagesFromRoom;
};

const services = {
    getAllMessagesFromRoom,
};

export default services;