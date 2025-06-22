import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { PopupProvider } from './context/PopupContext'
import Popup from './components/Popup'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PopupProvider>
      <Popup />
      <App />
    </PopupProvider>
  </StrictMode>,
)
