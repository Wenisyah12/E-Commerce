import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export function ThemeProvider({children}){
    const [themePref, setThemePref] = useState('light');

    useEffect(() => {
        let effective = themePref;
        if (themePref === 'system'){
            effective = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        document.documentElement.setAttribute('data-theme', effective);
    },[themePref]);

    return (
        <ThemeContext.Provider value={{themePref, setThemePref}}>
            {children}
        </ThemeContext.Provider>
    );
}

    export function useTheme(){
        return useContext(ThemeContext);
    }