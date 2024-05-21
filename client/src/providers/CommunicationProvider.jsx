import { createContext } from "react";
import CommunicationStore from "../store/communicationStore";


export const CommunicationContext = createContext()

export const CommunicationProvider = ({ children }) => {

    return (
        <CommunicationContext.Provider value = {{
            communicationStore: new CommunicationStore()
        }}>
            {children}
        </CommunicationContext.Provider>
    )
}