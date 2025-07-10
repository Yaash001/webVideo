import type { ReactNode } from "react"
import { Navigate } from "react-router-dom";

//this route for logeed in users
interface RouteProps{
    element:ReactNode
}
export const ProtectedRouteHome : React.FC<RouteProps>= ({element}) =>{
    const tk = localStorage.getItem("token");
        return tk ? element : <Navigate to={"/sign-in"}/>;
};

//show profile if logged in
export const ProtectedRoute : React.FC<RouteProps>= ({element}) =>{
    const tk = localStorage.getItem("token");
        return tk ? <Navigate to={"/user-profile"}/> : element;
};
