import express  from 'express';
import authRoute from './authRoute'
const r = express.Router()

r.use('/auth',authRoute);

export default r;
