import express  from 'express';
import { signUpUser,signInUser } from '../controller/auth/authController';
const r = express.Router()

r.post('/sign-up',signUpUser)
r.post('/sign-in',signInUser)

export default r;
