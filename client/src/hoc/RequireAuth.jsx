import { Navigate } from "react-router-dom";
import { AUTHORIZATION_ROUTE } from "../utils/consts";

const RequireAuth = ({children}) => {
    if(!localStorage.getItem("Token")) {
        return <Navigate to = {AUTHORIZATION_ROUTE} />
    }
    return children
}
export default RequireAuth;