import React, { useContext } from "react";
import './MenuButton.css'
import { logout } from "../../http/userAPI"
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../providers/UserProvider";
const Button = (
    props
    ) => {
    const navigate = useNavigate();
    const {userStore} = useContext(UserContext)
    const logOut = async () => {
        try {
            await logout()
            userStore.setUser({})
            navigate('/')
        } catch (error) {
            alert(error.response?.data?.message)
        }
    }
    return (
        <button className= "menu__button" onClick={() => {
            if (props.data.id === 1) {
                    props.changeProfileActive(!props.profileActive)
                    props.changeMenuActive(!props.menuActive)
            } else if ( props.data.id === 2) {
                    props.changeSettingsActive(!props.settingsActive)
                    props.changeMenuActive(!props.menuActive)
                
            } else if ( props.data.id === 3) {
                logOut()
                props.changeMenuActive(!props.menuActive)
            }
        }
        
        }>
            {props.data.text}
        </button>
    );
}
export default Button;