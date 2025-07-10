import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../reducer/store';

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
export const authReducer = authSlice.reducer;
export const selectLoggedIn = (state : RootState)=>state.auth.loggedIn;
export const selectLoading = (state : RootState)=>state.auth.loading;

