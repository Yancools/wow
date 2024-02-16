import { createContext, useMemo, useState} from "react";



let Theme = localStorage.getItem("Theme", "Dark")

if (Theme === null ) {
    Theme = "Light"
}

export const ThemeContext = createContext({theme: Theme})

export const ThemeProvider = ({ children }) => {

    const [theme, setTheme] = useState(Theme)

    const value = useMemo(() => ({ theme, setTheme }), [theme])

    return (
        <ThemeContext.Provider value = {value}>
            {children}
        </ThemeContext.Provider>
    )
}