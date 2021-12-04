import { NextFunction, Request, Response } from "express";
import { Socket } from "../node_modules/socket.io/dist";
import { User } from "./domain/User";
import config from './config';
import allRoutes from './routes/allRoutes';
import setupModels from './db/setup/ModelAssociation';
import userRepository from "./repository/userRepository";
import messageRepository from "./repository/messageRepository";
import roomRepository from "./repository/roomRepository";

const { getUser } = userRepository;
const { registerMessage } = messageRepository;

const { instanceSequelize } = setupModels; 

const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');

const app = express();
app.use(cors());
app.options('*', cors()); 
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.json())

instanceSequelize.sync();

app.get('/health', async (req: Request, res: Response, next: NextFunction) => {
  return res.send("health is ok ! ");
});

app.use('/user', allRoutes.userRoutes);

app.use('/message', allRoutes.messageRoutes);

app.use('/room', allRoutes.roomRoutes);

const server = app.listen(config.port, () =>  console.log('ChatPlug server is running on port : ', config.port));

// const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: '*',
  }
});

io.on('connection', (socket: Socket) => {
  console.log('We have a new connection !');

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

  socket.on('sendMessage', async ({userId, message, room}, callback) => {
    const user = await getUser(userId);

    console.log('user sending message : ', user);
    const messageToSend = await registerMessage(user, message);
    console.log('Message to send : ', messageToSend);
    io.to(room.id).emit('message', { user, messageToSend});
    console.log('To Room  : ', room.id);
    callback();

  })

  socket.on('disconnect', () => {
    console.log('User had left ! ');
  })
})