import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import backendApi from './../../api/backendApi';
import { toast } from 'sonner';
import type { NavigateFunction } from 'react-router-dom';

// ====== Interfaces ======
interface User {
  _id: string;
  email: string;
  name?: string;
  token: string;
  uploadCount: string;
  downloadCount: string;
}

export interface AuthSate {
  loggedIn: User | null;
  loading: boolean;
}

interface Signupload {
  email: string;
  password: string;
}

interface Signinload {
  email: string;
  password: string;
  navigate: NavigateFunction;
}

interface Response {
  sucess: boolean;
  message: string;
  user?: User;
}

interface SignupResponse {
  success: boolean;
  message: string;
}

// ====== Initial State ======
const initialState: AuthSate = {
  loggedIn: null,
  loading: false,
};

// ====== Sign Up User Thunk ======
export const signUpUser = createAsyncThunk<
  SignupResponse,
  Signupload,
  { rejectValue: string }
>('auth/sign-up', async (load, thunkApi) => {
  try {
    const { data } = await backendApi.post<Response>('/api/v1/auth/sign-up', load);
    if (data.sucess) {
      return { success: true, message: data.message };
    } else {
      return thunkApi.rejectWithValue(data.message);
    }
  } catch (error: any) {
    const msg = error?.response?.data?.message || 'Signup failed';
    return thunkApi.rejectWithValue(msg);
  }
});

// ====== Sign In User Thunk ======
export const signInUser = createAsyncThunk<
  User | null,
  Signinload,
  { rejectValue: string }
>('auth/sign-in', async (load, thunkApi) => {
  try {
    const { email, password } = load;
    const { data } = await backendApi.post<Response>('/api/v1/auth/sign-in', {
      email,
      password,
    });

    if (data.sucess && data.user?.token) {
      toast.success(data.message);
      localStorage.setItem('token', data.user.token);
      return data.user;
    } else {
      toast.warning(data.message);
      return thunkApi.rejectWithValue(data.message);
    }
  } catch (error: any) {
    const errormsg = error.response?.data?.message || 'Something went wrong';
    toast.error(errormsg);
    return thunkApi.rejectWithValue(errormsg);
  }
});

// ====== Auth Slice ======
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Sign In
      .addCase(signInUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signInUser.fulfilled, (state, action: PayloadAction<User | null>) => {
        state.loggedIn = action.payload;
        state.loading = false;
      })
      .addCase(signInUser.rejected, (state) => {
        state.loggedIn = null;
        state.loading = false;
      });
  },
});

// ====== Selectors ======
export const authReducer = authSlice.reducer;
export const selectLoggedIn = (state: RootState) => state.auth.loggedIn;
export const selectLoading = (state: RootState) => state.auth.loading;
