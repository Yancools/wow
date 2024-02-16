import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import './Home.css'
import Header from "../../components/Header/Header";
import Dialog from "../../components/Dialog/Dialog"
import Menu from "../../components/Menu/Menu";
import Chat from "../../components/Chat/Chat";
import Profile from "../../components/Profile/Profile";
import Settings from "../../components/Settings/Settings"
import { useState } from "react";

const Home = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if(!localStorage.getItem("Token")) {
            navigate('/login')
        }
    })
    const [translation, i18next] = useTranslation();

    const [menuActive, setMenuActive] = useState(false);

    const [profileActive, setProfileActive] = useState(false);
    
    const [settingsActive, setSettingsActive] = useState(false);

    const changeLanguage = (language) => {
        i18next.changeLanguage(language);
    }

    const changeProfileActive = (newState) => {
        setProfileActive(newState)
    }

    const changeSettingsActive = (newState) => {
        setSettingsActive(newState)
    }
    
    const changeMenuActive = (newState) => {
        setMenuActive(newState)
    }

    return (
        <div className="home">
            <div className="dialogs">
                <Header
                    menuActive = {menuActive}
                    changeMenuActive = {changeMenuActive}
                />
                <div className="dialog__list">
                    <Dialog/>
                </div>
            </div>
           
            <Chat/>
                <Menu 
                    menuActive = {menuActive}
                    changeMenuActive = {changeMenuActive}
                    translation = {translation}
                    profileActive = {profileActive}
                    changeProfileActive = {changeProfileActive}
                    settingsActive = {settingsActive}
                    changeSettingsActive = {changeSettingsActive}
                />            
            <Profile 
                profileActive = {profileActive} 
                changeProfileActive = {changeProfileActive}
                translation = {translation}
            />
            <Settings 
                settingsActive = {settingsActive} 
                changeSettingsActive = {changeSettingsActive}
                changeLanguage = {changeLanguage}
                translation = {translation}
            />
        </div>
    );
}

export default Home;
