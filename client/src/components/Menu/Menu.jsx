import './Menu.css'
import React, { useContext } from "react";
import { useTranslation } from 'react-i18next';
import { observer } from "mobx-react"
import { logout } from "../../http/userAPI"
import { useNavigate } from 'react-router-dom';
import { CHATLIST_ROUTE, DEFAULT_ROUTE, SETTINGS_ROUTE } from '../../utils/consts';
import { UserContext } from '../../providers/UserProvider';

const Menu = observer(() => {
    const [translation] = useTranslation();
    const navigate = useNavigate();
    const {userStore} = useContext(UserContext)
    const logOut = async () => {
        try {
            await logout()
            userStore.setUserData({})
            userStore.setProfileUrl({})
        } catch (error) {
            alert(error.response?.data?.message)
        }
    }
    return(
        <div className="menu">
            <ul className="navbar">
                { translation('menu', { returnObjects: true }).map((data) =>
                    <li className= "navbar__item" key = {data.id} onClick={() => {
                        if (data.id === 1) {
                            navigate(DEFAULT_ROUTE + userStore.userData.nickname)
                        } else if ( data.id === 2) {
                            navigate(CHATLIST_ROUTE)
                        } else if ( data.id === 3) {
                            navigate(SETTINGS_ROUTE)
                        } else if(data.id === 4){
                            logOut()
                        }
                    }}>
                        <div className={"navbar__item--icon " + data.icon}></div>
                        <p className= "navbar__item--text" >
                            {data.text}
                        </p>
                    </li>
                )}
            </ul>      
            <div className="menu__copytight">
                    © И. А. Бабайлов, 2024
            </div> 
        </div>
    );
})
export default Menu;