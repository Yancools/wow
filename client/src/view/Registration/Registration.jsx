import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { registration } from "../../http/userAPI";
import { observer } from "mobx-react-lite"

import "./Registration.css"


const Registration = observer(() => {
    const [translation] = useTranslation();
    const navigate = useNavigate();
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const signUp = async (e) => {
        e.preventDefault();
        try {
            await registration(login, password, firstname, lastname)
            navigate('/')
            window.location.reload();
        } catch (error) {
           alert(error.response?.data?.message)
        }
    }
    return (
        <div className="register">
            <Link to = "/login" className="moveBack">
                <span></span>
            </Link>
            <form className="register__form">
                <div className="register__form--header">
                    {translation("register.title")}
                </div>
                <div className="register__form--input">
                    <input type="text" required
                       value={login}
                       onChange={ e => setLogin(e.target.value)}
                    />
                    <label htmlFor="">{translation("register.login")}</label>
                </div>
                <div className="register__form--input">
                    <input type="password" required
                           value={password}
                           onChange={ e => setPassword(e.target.value)}
                    />
                    <label htmlFor="">{translation("register.password")}</label>
                </div>
                <div className="register__form--input">
                    <input type="text" required
                           value={firstname}
                           onChange={ e => setFirstname(e.target.value)}
                    />
                    <label htmlFor="">{translation("register.firstname")}</label>
                </div>
                <div className="register__form--input">
                    <input type="text" required
                           value={lastname}
                           onChange={ e => setLastname(e.target.value)}
                    />
                    <label htmlFor="">{translation("register.lastname")}</label>
                </div>
                <button className="register__form--button" onClick={signUp}>
                    {translation("register.button")}
                </button>
            </form> 
        </div>
    )
})
export default Registration