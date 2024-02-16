import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { login } from "../../http/userAPI"
import "./Auth.css"
import { observer } from "mobx-react-lite"

const Auth = observer(() => {
    const [translation] = useTranslation();
    const navigate = useNavigate();
    const [Login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const signIn = async (e) => {
        e.preventDefault();
        try {
            await login(Login, password)
            navigate('/')
            window.location.reload();
        } catch (error) {
            alert(error.response?.data?.message)
        }
    }
    return (
        <div className="auth">
            <form className="auth__form">
                <div className="auth__form--header">
                    {translation("authorization.title")}
                </div>
                <div className="auth__form--input">
                    <input type="text" required
                        value={Login}
                        onChange={ e => setLogin(e.target.value)}
                    />
                    <label htmlFor="">{translation("authorization.login")}</label>
                </div>
                <div className="auth__form--input">
                    <input type="password" required
                        value={password}
                        onChange={ e => setPassword(e.target.value)}
                    />
                    <label htmlFor="">{translation("authorization.password")}</label>
                </div>
                <div className="auth__form--forget">
                    <label htmlFor="">
                        <input type="checkbox"/>
                        {translation("authorization.remember")}
                        <Link to = "/forget">
                            {translation("authorization.forget")}
                        </Link>
                    </label>
                    
                </div>
                <button className="auth__form--button" onClick={signIn}>
                    {translation("authorization.button")}
                </button>
                <div className="auth__form--register">
                    {translation("authorization.noAcc")}
                    <Link to = "/registration">
                        {translation("authorization.register")}
                    </Link>
                </div>
            </form> 
        </div>
    )
})
export default Auth