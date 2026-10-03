import { createContext, useContext, useState, useEffect } from "react";

const InputModeContext = createContext();

export function InputModeProvider({children}) {
    const [inputPref, setInputPref] = useState('auto');

    useEffect(() => {
        if (inputPref === 'auto') {
            document.documentElement.removeAttribute('data-input');
        } else {
            document.documentElement.setAttribute('data-input', inputPref);
        }
    },[inputPref]);
    
    return (
      <InputModeContext.Provider value={{inputPref, setInputPref}}>
        {children}
      </InputModeContext.Provider>  
    );
}

export function useInputMode() {
    return useContext(InputModeContext);
}