import axios from "axios";
import { Message } from "../../components/domain/user/Message";
import { User } from "../../components/domain/user/User";

/** Register user in database */
const getAllMessagesFromRoom = async (roomId: number) => {
    const allMessagesFromRoomResponse = await axios
        .get<{ id: number, text: string, date: Date, user: {id: number, pseudo:string, status:string}}[]>("http://localhost:8090/message/room-messages?roomId="+roomId);
    console.log('Response message : ', allMessagesFromRoomResponse);
    const allMessagesFromRoom = allMessagesFromRoomResponse.data
        .map(({ id, text, date, user}) => {
            console.log('USER SERVICE : ', user);
            const userBuilt = new User(user.id, user.pseudo, user.status); 
           return new Message(id, text, date, userBuilt);
        });

    return allMessagesFromRoom;
};

const services = {
    getAllMessagesFromRoom,
};

export default services;