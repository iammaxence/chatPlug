import { Socket } from "../../../node_modules/socket.io/dist";
import { User } from "../../domains/User";
import userRepository from "../../infrastructure/repository/userRepository";
import messageRepository from "../../infrastructure/repository/messageRepository";
import roomRepository from "../../infrastructure/repository/roomRepository";
import { Server } from "http";
import { Server as SocketIoServer } from "socket.io";

const { getUser } = userRepository;
const { registerMessage } = messageRepository;

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
        socket.on('join', async ({id, room}) => {
          
            const user = await getUser(id);
        
            console.log('user : ', user);
            const userAdmin = new User(0, 'admin', 'admin');
        
            socket.emit('message', {user: userAdmin, messageToSend: `welcome ${user.getName()} to ${room.name}`})
            socket.broadcast.to(room.id).emit('message', { user: userAdmin, messageToSend: `${user.getName()} has joined`})
        
            socket.join(room.id);
        
            const isAlreadyJoinRoom = await roomRepository.userHasJoinedRoom(room.id, user.getId());
            if(!isAlreadyJoinRoom)
              await roomRepository.joinRoom(room.id, user.getId());
        })
    }

    sendMessage(socket: Socket, io: SocketIoServer) {
        socket.on('sendMessage', async ({userId, message, room}, callback) => {
            const user = await getUser(userId);
        
            console.log('user sending message : ', user);
            const messageToSend = await registerMessage(user, message);
            console.log('Message to send : ', messageToSend);
            io.to(room.id).emit('message', { user, messageToSend});
            console.log('To Room  : ', room.id);
            callback();
        
          })
    }

    disconnection(socket: Socket) {
        socket.on('disconnect', () => {
            console.log('User had left ! ');
          })
    }
}