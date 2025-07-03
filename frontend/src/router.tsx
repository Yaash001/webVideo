import { createBrowserRouter } from "react-router-dom";
import { UserProfile } from "./pages/user/UserProfile";
import { SignUp } from "./pages/auth/SignUp";
import { SignIn } from "./pages/auth/SignIn";

export const router = createBrowserRouter([
    {path:'/sign-up',element:<SignUp/>},
    {path:'/sign-in',element:<SignIn/>},
    {path:'/user-profile',element:<UserProfile/>},

])