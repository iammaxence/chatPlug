import { Server as SocketIoServer } from "socket.io";
import { Socket } from "../../../node_modules/socket.io/dist";
import { User } from "../../domains/User";
import { MessageRepository } from "../../infrastructure/repository/MessageRepository";
import { RoomRepository } from "../../infrastructure/repository/RoomRepository";
import { UserRepository } from "../../infrastructure/repository/UserRepository";

export class SocketController {
    userRepository: UserRepository;
    roomRepository: RoomRepository;
    messageRepository: MessageRepository;

    constructor(userRepository: UserRepository, roomRepository: RoomRepository, messageRepository: MessageRepository) {
        this.userRepository = userRepository;
        this.roomRepository = roomRepository;
        this.messageRepository = messageRepository;
    }

    connexion(io: SocketIoServer) {
        io.on('connection', (socket: Socket) => {
            console.log('We have a new connection !');

            this.join(socket);
          
            this.sendMessage(socket, io);
          
            this.disconnection(socket);
          })
    }

    join(socket: Socket) {
        socket.on('join', async ({id, room: roomData}) => {
          
            const user = await this.userRepository.getUser(id);
            if(!user) throw new Error(`User ${id} does not exists : It should not append`);
            
            const room = await this.roomRepository.findRoom(roomData.name);
            if(!room) throw new Error(`Room ${roomData.name} does not exists : It should not append`);
            
            // const userAdmin = new User(0, 'admin', 'PENDING');
        
            // socket.emit('message', {user: userAdmin, messageToSend: `welcome ${user.getPseudo()} to ${room.getName()}`})
            // socket.broadcast.to(room.getId().toString()).emit('message', { user: userAdmin, messageToSend: `${user.getPseudo()} has joined`})
        
            socket.join(room.getId().toString());
        
            const isAlreadyJoinRoom = await this.roomRepository.userHasJoinedRoom(room.getId(), user.getId());
            if(!isAlreadyJoinRoom)
              await this.roomRepository.joinRoom(room.getId(), user.getId());
        })
    }

    sendMessage(socket: Socket, io: SocketIoServer) {
        socket.on('sendMessage', async ({userId, message, room: roomData}, callback) => {

            const user = await this.userRepository.getUser(userId);
            if(!user) throw new Error(`User ${userId} does not exists : It should not append`);

            const room = await this.roomRepository.findRoom(roomData.name);
            if(!room) throw new Error(`Room ${roomData.name} does not exists : It should not append`);

            console.log('user sending message : ', user);
            const messageToSend = await this.messageRepository.createMessage(userId, room.getId(), message);
            console.log('Message to send : ', messageToSend);
            io.to(room.getId().toString()).emit('message', { user, messageToSend});
            console.log('To Room  : ', room.getId());
            callback();
        
          })
    }

    disconnection(socket: Socket) {
        socket.on('disconnect', () => {
            console.log('User had left ! ');
          })
    }
}