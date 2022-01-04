import { Socket } from "../../../node_modules/socket.io/dist";
import { User } from "../../domains/User";
import userRepository from "../../infrastructure/repository/userRepository";
import messageRepository from "../../infrastructure/repository/messageRepository";
import roomRepository from "../../infrastructure/repository/roomRepository";
import { Server } from "http";
import { Server as SocketIoServer } from "socket.io";

const { getUser } = userRepository;
const { registerMessage } = messageRepository;
const { findRoom } = roomRepository

export class SocketIoConfiguration {
    private server: Server;

    constructor(server: Server) {
        this.server = server
    }

    initialise() {
        const io = new SocketIoServer(this.server, {
            cors: {
              origin: '*',
            }
          });
          this.connexion(io);
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
          
            const user = await getUser(id);
            if(!user) throw new Error(`User ${id} does not exists : It should not append`);
            
            const room = await findRoom(roomData.name);
        
            console.log('user : ', user);
            const userAdmin = new User(0, 'admin', 'admin');
        
            socket.emit('message', {user: userAdmin, messageToSend: `welcome ${user.getPseudo()} to ${room.getName()}`})
            socket.broadcast.to(room.getId().toString()).emit('message', { user: userAdmin, messageToSend: `${user.getPseudo()} has joined`})
        
            socket.join(room.getId().toString());
        
            const isAlreadyJoinRoom = await roomRepository.userHasJoinedRoom(room.getId(), user.getId());
            if(!isAlreadyJoinRoom)
              await roomRepository.joinRoom(room.getId(), user.getId());
        })
    }

    sendMessage(socket: Socket, io: SocketIoServer) {
        socket.on('sendMessage', async ({userId, message, room: roomData}, callback) => {

            const user = await getUser(userId);
            if(!user) throw new Error(`User ${userId} does not exists : It should not append`);

            const room = await findRoom(roomData.name);

            console.log('user sending message : ', user);
            const messageToSend = await registerMessage(user, room, message);
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