import bcrypt from 'bcrypt';

export const hashpass =async(pass:string,):Promise<string> =>{
    const hashpass = await bcrypt.hash(pass,10);
    return hashpass;
}