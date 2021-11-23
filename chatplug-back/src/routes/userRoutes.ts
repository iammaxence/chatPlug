import express from 'express';
const { createUser, getUser }  = require('../controllers/userController');

const userRoutes = express.Router();

userRoutes.post('/createUser', createUser);

userRoutes.get('/getUser', getUser);

export = userRoutes;