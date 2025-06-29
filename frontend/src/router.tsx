import { createBrowserRouter } from "react-router-dom";
import { SignIn } from "./pages/auth/Signin";
import { SignUp } from "./pages/auth/Signup";

export const router = createBrowserRouter([
    {path:'/sign-up',element:<SignUp/>},
    {path:'/sign-in',element:<SignIn/>},

])