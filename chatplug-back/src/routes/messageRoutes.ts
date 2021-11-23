import express from 'express';
const { createMessage, getAllMessagesFromRoom }  = require('../controllers/messageController');

const messageRoute = express.Router();

messageRoute.post('/createMessage', createMessage);

messageRoute.get('/room-messages', getAllMessagesFromRoom);

export = messageRoute;