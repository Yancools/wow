import React from "react";
import './Burger.css'

const Burger = (
    {
        menuActive, 
        changeMenuActive
    }) => {

    return (
        <div className="burger" onClick={() => changeMenuActive(!menuActive)}>
            <button/>
        </div>
    );
}

export default Burger;
