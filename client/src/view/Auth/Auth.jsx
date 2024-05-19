import "./Auth.css"
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { login, userData } from "../../http/userAPI"
import { observer } from "mobx-react"
import { jwtDecode } from "jwt-decode"
import { UserContext } from "../../providers/UserProvider";
import { DEFAULT_ROUTE } from "../../utils/consts";

const Auth = observer(() => {
    const {userStore} = useContext(UserContext)
    const [translation] = useTranslation();
    const navigate = useNavigate();
    const [Login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const signIn = async (e) => {
        e.preventDefault();
        try {
            if(!Login || !password){
                alert("Данные полей не могут быть пустыми")
                return false
            }
            await login(Login, password).then(responce => {
                const decode = jwtDecode(responce.data)
                userStore.setProfileUrl(decode.nickname)
                userData(decode.nickname).then(data => {
                    userStore.setUserData(data)
                })
            })
            navigate(DEFAULT_ROUTE, { replace: true })
        } catch (error) {
            alert(error.response?.data?.message)
        }
    }
    return (
        <div className="container">
            <div className="auth">
                <form className="auth__form">
                    <div className="auth__form--title">
                        {translation("authorization.title")}
                    </div>
                    <div className="auth__form--input">
                        <input type="text" required
                            id="login"
                            value={Login}
                            onChange={ e => setLogin(e.target.value)}
                        />
                        <label htmlFor="login">{translation("authorization.login")}</label>
                    </div>
                    <div className="auth__form--input">
                        <input type="password" required
                            id="password"
                            value={password}
                            onChange={ e => setPassword(e.target.value)}
                        />
                        <label htmlFor="password">{translation("authorization.password")}</label>
                    </div>
                
                    <button className="auth__form--button" onClick={signIn}>
                        {translation("authorization.button")}
                    </button>
                    <div className="auth__form--forget">
                            <Link to = "/forget">
                                {translation("authorization.forget")}
                            </Link>
                    </div>
                    <div className="auth__form--register">
                        {translation("authorization.noAcc")}
                        <Link to = "/registration">
                            {translation("authorization.register")}
                        </Link>
                    </div>
                </form> 
            </div>
        </div>
    )
})
export default Auth