import React, { useContext } from "react";
import Navbar from "../Navbar/Navbar"
import './Menu.css'
import { UserContext } from "../../providers/UserProvider";
import { observer } from "mobx-react-lite";

const Menu = observer( ({
    menuActive, 
    changeMenuActive, 
    translation,
    profileActive, 
    changeProfileActive, 
    settingsActive, 
    changeSettingsActive,
}) => {
    
    const {userStore} = useContext(UserContext)
    return(
        <div className={menuActive ? "menu active" : "menu"} onMouseLeave={() => changeMenuActive(false)}>
            <div className="content">
                <div className="content__header">
                    <div className="content__header--logo" onClick = {() => {}}></div>
                    <div className="content__header--name">
                        <p>{userStore.user.firstname}</p>
                        <p>{userStore.user.lastname}</p>
                    </div>
                    <div className="content__header--status">
                        {userStore.user.status}
                    </div>
                </div>
                <Navbar
                    translation = {translation}
                    menuActive = {menuActive}
                    changeMenuActive = {changeMenuActive}
                    profileActive = {profileActive}
                    changeProfileActive = {changeProfileActive}
                    settingsActive = {settingsActive}
                    changeSettingsActive = {changeSettingsActive}
                />
                <div className="content__copytight">
                    © И. А. Бабайлов, 2023
                </div>
            </div>
        </div>
    );
})
export default Menu;