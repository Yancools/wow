import React from "react";
import Burger from "../Burger/Burger"
import Search from "../Search/Search"
import "./Header.css"


const Header = ({
        menuActive,
        changeMenuActive
}) => {
    return (
        <div className="header">
            <Burger 
                menuActive={menuActive} 
                changeMenuActive = {changeMenuActive}
            />
            <Search />
        </div>
    )
}
export default Header