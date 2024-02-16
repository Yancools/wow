import React from "react";
import Switch from "../Switch/Switch";
import './Settings.css'

const Settings = ({
    settingsActive, 
    changeSettingsActive,
    changeLanguage,
    translation,

    }) => {
    return (
        <div className = {settingsActive ? "settings active" : "settings"} onClick= { () => changeSettingsActive(!settingsActive)}>
            <div className = {settingsActive ? "settings__content active" : "settings__content"} onClick={e => e.stopPropagation()}>
                <div className="settings__content--title">
                    {translation("settings.title")}
                </div>
                <div className="settings__content--ul">
                {translation('settings.switch', { returnObjects: true }).map((data) =>
                    <div className="settings__content--li" key = {data.id}>
                        <p>{data.text}</p>
                        <Switch 
                            key = {data.id}
                            data = {data}
                            changeLanguage = {changeLanguage}
                        />
                    </div>
                )}
                
                </div>
            </div>
        </div>
    );
}

export default Settings;