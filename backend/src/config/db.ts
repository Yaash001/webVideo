import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const connectDb = async ()=>{
    try{

        const db = await mongoose.connect(process.env.MONGO_URI as string);
        console.log("Connection Sucess")
    }
    catch(error){
        console.error(`Error While Connecting... ${error}`);
    }
};

export default connectDb;
