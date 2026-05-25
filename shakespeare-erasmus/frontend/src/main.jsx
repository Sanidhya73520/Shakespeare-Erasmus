import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/globals.css'
import { LanguageProvider } from './context/LanguageContext'
import { JourneyProvider } from './context/JourneyContext'
import { UserProvider } from './context/UserContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LanguageProvider>
      <UserProvider>
        <JourneyProvider>
          <App />
        </JourneyProvider>
      </UserProvider>
    </LanguageProvider>
  </React.StrictMode>,
)
