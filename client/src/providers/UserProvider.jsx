import { createContext } from "react";
import UserStore from "../store/userStore";


export const UserContext = createContext()

export const UserProvider = ({ children }) => {

    return (
        <UserContext.Provider value = {{
            userStore: new UserStore()
        }}>
            {children}
        </UserContext.Provider>
    )
}