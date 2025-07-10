import { createBrowserRouter } from "react-router-dom";
import { UserProfile } from "./pages/user/UserProfile";
import { SignUp } from "./pages/auth/SignUp";
import { SignIn } from "./pages/auth/SignIn";
import { ProtectedRoute, ProtectedRouteHome } from "./components/ProtectedRoute";

export const router = createBrowserRouter([
  {path: '/sign-up',element: <ProtectedRoute element={<SignUp />}/>},
  {path: '/sign-in',element: <ProtectedRoute element={<SignIn />}/>},
  {path: '/user-profile',element: <ProtectedRouteHome element={<UserProfile />}/>},
  
]);
