import './Settings.css'
import React from "react";
import { useTranslation } from "react-i18next";
import Switch from "../../components/Switch/Switch";
import Menu from "../../components/Menu/Menu"
import { observer } from "mobx-react";

const Settings =  observer(() => {
    const [translation, i18next] = useTranslation();
    const changeLanguage = (language) => {
        i18next.changeLanguage(language);
    }
    return (
        <div className="container">
            <div className = "section">
                <Menu/>
                <div className = "content">
                    <div className="content__ul">
                        {translation('settings.switch', { returnObjects: true }).map((data) =>
                            <div className="settings__content--li" key = {data.id}>
                                {data.text}
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
        </div>
    );
})

export default Settings;