import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CookiesProvider } from "react-cookie";
import { SessionProvider } from "./hooks/SessionContext.jsx"; 

createRoot(document.getElementById('root')).render(
  <SessionProvider>
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </SessionProvider>
)
