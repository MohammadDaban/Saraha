import express from 'express';
import * as AuthController from './Controller/Auth.controller.js'
import { asyncHandler } from '../../Middelware/errorHandleing.js';

import { signinSchema, signupSchema } from './Auth.validation.js';
import  validation  from '../../Middelware/validation.js';
const app = express();


app.post('/signup',validation(signupSchema),asyncHandler(AuthController.signup))
app.post('/signin',validation(signinSchema),asyncHandler(AuthController.signIn))
app.get('/confirmEmail/:token',asyncHandler(AuthController.confirmEmail))
app.get('/newConfirmEmail/:refreshToken',asyncHandler(AuthController.newConfirmEmail))


export default app