import "./Registration.css"
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { registration, userData } from "../../http/userAPI";
import { observer } from "mobx-react"
import { jwtDecode } from "jwt-decode"
import { UserContext } from "../../providers/UserProvider";
import { DEFAULT_ROUTE } from "../../utils/consts";


const Registration = observer(() => {
    const {userStore} = useContext(UserContext)
    const [translation] = useTranslation();
    const navigate = useNavigate();
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [gender, setGender] = useState('');
    const signUp = async (e) => {
        e.preventDefault();
        try {
            if(!login || !password || !firstname || !lastname || !gender) {
                alert("Данные полей не могут быть пустыми")
                return false
            }
            await registration(login, password, firstname, lastname, gender).then(responce => {
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
            <div className="register">
                <form className="register__form">
                    <div className="register__form--title">
                        {translation("register.title")}
                    </div>
                    <div className="register__form--input">
                        <input type="text" required
                        id="login"
                        value={login}
                        onChange={ e => setLogin(e.target.value)}
                        />
                        <label htmlFor="login">
                            {translation("register.login")}
                        </label>
                    </div>
                    <div className="register__form--input">
                        <input type="password" required
                            id="password"
                            value={password}
                            onChange={ e => setPassword(e.target.value)}
                        />
                        <label htmlFor="password">
                            {translation("register.password")}
                        </label>
                    </div>
                    <div className="register__form--input">
                        <input type="text" required
                            id="firstname"
                            value={firstname}
                            onChange={ e => setFirstname(e.target.value)}
                        />
                        <label htmlFor="firstname">
                            {translation("register.firstname")}
                        </label>
                    </div>
                    <div className="register__form--input">
                        <input type="text" required
                            id="lastname"
                            value={lastname}
                            onChange={ e => setLastname(e.target.value)}
                        />
                        <label htmlFor="lastname">
                            {translation("register.lastname")}
                        </label>
                    </div>
                    <select className="register__form--select" defaultValue="" onChange={ e  => setGender(e.target.value) }>
                        <option value="" hidden>
                            {translation("register.gender")}
                        </option>
                        <option value="man">
                            {translation("register.man")}
                        </option>
                        <option value="woman">
                            {translation("register.woman")}
                        </option>
                    </select>
                    <button className="register__form--button" onClick={signUp}>
                        {translation("register.button")}
                    </button>
                    <div className="auth__form--register">
                        {translation("register.haveAcc")}
                        <Link to = "/auth">
                            {translation("register.authorization")}
                        </Link>
                    </div>
                </form> 
            </div>
        </div>
    )
})
export default Registration