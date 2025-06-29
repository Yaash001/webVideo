import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import backendApi from './../../api/backendApi';
import { toast } from 'sonner';


interface User {
    _id:string;
    email:string;
    name?:string;
    token:string;
    uploadCount:string;
    downloadCount:string;
}

export interface  AuthSate{
    loggedIn:User | null;
    loading:boolean;
}

interface Signupload {
    email:string,
    password:string
}
interface Response{
    sucess:boolean,
    message:string,
    user?:User
}
const initialState :  AuthSate ={
    loggedIn:null,
    loading:false,
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{},
}

);

//signup req

export const signUpUser = createAsyncThunk<void,Signupload,{rejectValue:string}>("auth/sign-up",async(load,thunkApi)=>{
    try {
        const d = await backendApi.post<Response>("/api/v1/auth/sign-up",load);
        if(d.data.sucess)
        {
            toast.success(d.data.message)
        }
        else{
            toast.warning(d.data.message)
        }
    } catch (error) {
        toast.error(`${error}`)
        
    }
}
)



export const authReducer = authSlice.reducer;
export const selectLoggedIn = (state : RootState)=>state.auth.loggedIn;
export const selectLoading = (state : RootState)=>state.auth.loading;

