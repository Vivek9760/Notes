import { Navigate, Outlet } from "react-router-dom";


export default function PrivateComponents(){
return (localStorage.getItem('token') ? <Outlet /> :<Navigate to="/signup" /> )
}