import React from "react";
import cn from 'classnames'
import useTheme from "../../hooks/useTheme";

const Layout = ({children}) => {
    const { theme } = useTheme()
    return (
        <div className= {cn('layout', {
            light: theme === "Light",
            dark: theme === "Dark"
        })}>
            {children}
        </div>
    )
}
export default Layout