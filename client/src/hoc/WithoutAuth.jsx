import { Navigate } from "react-router-dom"
import { DEFAULT_ROUTE } from "../utils/consts";

const WithoutAuth = ({children}) => {
    if(localStorage.getItem("Token")) {
        return <Navigate to = {DEFAULT_ROUTE} />
    }
    return children
}
export default WithoutAuth;