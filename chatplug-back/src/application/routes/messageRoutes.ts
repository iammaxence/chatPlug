import express from 'express';
const { createMessage, getAllMessagesFromRoom }  = require('../controllers/messageController');

const messageRoute = express.Router();

messageRoute.post('/create-message', createMessage);

messageRoute.get('/room-messages', getAllMessagesFromRoom);

export = messageRoute;