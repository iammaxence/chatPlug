import express from 'express';
const { createRoom, joinRoom }  = require('../controllers/roomController');

const roomRoute = express.Router();

roomRoute.post('/createRoom', createRoom);
roomRoute.post('/join', joinRoom);

export = roomRoute;