import express from 'express';
const { createUser, getUser, getUserByEmail,userExists  }  = require('../controllers/userController');

const userRoute = express.Router();

userRoute.post('/createUser', createUser);

userRoute.get('/getUser', getUser);

userRoute.get('/getUserByEmail', getUserByEmail);

userRoute.get('/exists', userExists);

export = userRoute;