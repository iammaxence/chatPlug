// import axios from "axios";

const createRoom = async (roomName: string) => {
    return {id: 1, name: roomName}
}

const getRoomByName = async (roomName: string) => {
    return {id: 1, name: roomName}
}

const services = {
    createRoom,
    getRoomByName,
};

export default services;