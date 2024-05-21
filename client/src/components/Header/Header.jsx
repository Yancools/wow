import "./Header.css"
import Search from "../Search/Search";
import React from "react"
import { useNavigate } from "react-router-dom";
import { DEFAULT_ROUTE } from "../../utils/consts";

const Header = () => {
    const navigate = useNavigate()
    return(
        <div className="header">
            {
                localStorage.getItem("Token") ?
                <div className="container">
                <div className="header__content">
                    <div className="header__content--logo" onClick={() => {
                        navigate(DEFAULT_ROUTE)
                    }}/>
                    <div className="header__content--text">
                        Corp
                    </div>
                    <Search/>   
                </div>
                </div>
                :
                <div className="container">
                    <div className="header__content">
                        <div className="header__content--logo"></div>
                        <div className="header__content--text">
                            Corp
                        </div>
                    </div>
                </div>
            }
        </div>        
    )
}
export default Header;