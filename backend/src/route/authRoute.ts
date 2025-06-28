import express  from 'express';
import { signUpUser } from '../controller/auth/authController';
const r = express.Router()

r.post('/sign-up',signUpUser)
export default r;
