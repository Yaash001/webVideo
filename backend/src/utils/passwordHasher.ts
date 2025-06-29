import bcrypt from 'bcrypt';

export const hashpass =async(pass:string,):Promise<string> =>{
    const hashpass = await bcrypt.hash(pass,10);
    return hashpass;
}

export const comparePass = async(pass:string,hashpass:string):Promise<boolean>=>{

    const r = await bcrypt.compare(pass,hashpass);
    return r;

}