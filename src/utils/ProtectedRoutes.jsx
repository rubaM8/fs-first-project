import { Outlet, Navigate } from "react-router-dom";
import { AppContext } from "../context/appContext";
import { useContext } from "react";

const ProtectedRoutes=()=>{
    const {isLoggedIn} = useContext(AppContext);

    return isLoggedIn? <Outlet/>:<Navigate to='/login' replace/>
    
}


export default ProtectedRoutes;