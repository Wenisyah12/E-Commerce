import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { CartProvider } from './context/CartContext.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { InputModeProvider } from './context/InputModeContext.jsx'
import { LanguageProvider } from './context/LanguageContext.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <ThemeProvider>
        <InputModeProvider>
          <LanguageProvider>
            <CartProvider>
              <App />
            </CartProvider>
          </LanguageProvider>
        </InputModeProvider>  
      </ThemeProvider>
    </HashRouter>
  </StrictMode>,
)
