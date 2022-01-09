import { Server } from "http";
import { Server as SocketIoServer } from "socket.io";
import controllers from '../../application/controllers/index';

const { socketController } = controllers;

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

      socketController.connexion(io);
    }
}