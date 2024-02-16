import React from "react";
import './Switch.css'
import { useState } from "react";
import useTheme from "../../hooks/useTheme";

const Switch = (
    props
    ) => {  
        const {setTheme} = useTheme()

        let storageLangActive = localStorage.getItem("i18nextLng")
        let storageThemeActive = localStorage.getItem("Theme")
        if (storageLangActive === "ru" || storageLangActive === null){
            storageLangActive = false
        } else if(storageLangActive === "en") {
            storageLangActive = true
        }

        if (storageThemeActive === "Light" || storageThemeActive === null){
            storageThemeActive = false
        } else if(storageThemeActive === "Dark") {
            storageThemeActive = true
        }
        const [activeLang, setActiveLang] = useState(storageLangActive)
        const [activeTheme, setActiveTheme] = useState(storageThemeActive)
        const switchLanguage = (activeLang, setActiveLang) => {
            setActiveLang(!activeLang);
            localStorage.setItem("storageLangActive", !activeLang)
            if (activeLang) {
                props.changeLanguage("ru")
            } else if (!activeLang) {
                props.changeLanguage("en")
            }
        }

        const switchTheme = (activeTheme, setActiveTheme) => {
            setActiveTheme(!activeTheme);
            localStorage.setItem("storageThemeActive", !activeTheme)
            if (activeTheme) {
                setTheme("Light")
                localStorage.setItem("Theme", "Light")
            } else if (!activeTheme) {
                setTheme("Dark")
                localStorage.setItem("Theme", "Dark")
            }
        }
         

        if (props.data.id === 1) {
            return (
                <div className = { activeLang ? "switch-btn switch-on" : "switch-btn"} onClick={ () => { switchLanguage(activeLang, setActiveLang)}}></div>
            )     
        } else if ( props.data.id === 2) {
            return (
                <div className = { activeTheme ? "switch-btn switch-on" : "switch-btn"} onClick={ () => { switchTheme(activeTheme, setActiveTheme)}}></div>
            )
        } 
}

export default Switch