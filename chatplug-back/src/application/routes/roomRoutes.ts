import express from 'express';
const { createRoom, joinRoom, findRoom }  = require('../controllers/roomController');

const roomRoute = express.Router();

roomRoute.post('/create-room', createRoom);

roomRoute.post('/join', joinRoom);

roomRoute.get('/get-room', findRoom);

export = roomRoute;