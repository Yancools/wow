import React from "react";
import Button from "../MenuButton/MenuButton"

import "./Navbar.css"

const Navbar = (props) => {
    return(
        <ul className="navbar">
            { props.translation('menu', { returnObjects: true }).map((data) =>
                <li className= "navbar__item" key = {data.id}>
                    <div className={"navbar__item--icon " + data.icon}></div>
                    <Button
                        data = {data} 
                        key = {data.id}
                        menuActive = {props.menuActive}
                        changeMenuActive = {props.changeMenuActive}
                        profileActive = {props.profileActive}
                        changeProfileActive = {props.changeProfileActive}
                        settingsActive = {props.settingsActive}
                        changeSettingsActive = {props.changeSettingsActive}
                    />
                </li>
                
            )}
        </ul>                
    )
}
export default Navbar