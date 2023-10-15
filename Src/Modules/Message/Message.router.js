import express from 'express';
import * as messageController from './Controller/Message.controller.js'
import { asyncHandler } from '../../Middelware/errorHandleing.js';
import { auth } from '../../Middelware/Auth.middelware.js';
const app = express();

app.post('/:receiverId',asyncHandler(messageController.sendMessage))
app.get('/',auth,asyncHandler(messageController.getMessages));

export default app;
