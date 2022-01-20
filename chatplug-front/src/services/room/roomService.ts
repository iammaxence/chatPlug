import axios from "axios";
import { Room } from "../../components/domain/Room";

const createRoom = async (roomName: string) => {
    const roomDataResponse = await axios.post<{id: number, name: string}>("http://localhost:8090/room/create-room", { roomName });

    const { id , name } = roomDataResponse.data
    return new Room(id, name);
}

const getRoomByName = async (roomName: string): Promise<Room|null> => {
    const roomDataResponse = await axios.get<{id: number, name: string}|null>("http://localhost:8090/room/get-room?roomName="+roomName);
    if(roomDataResponse && roomDataResponse.data) {
        const { id , name } = roomDataResponse.data
        return new Room(id, name);
    }
    return null;
}

const services = {
    createRoom,
    getRoomByName,
};

export default services;