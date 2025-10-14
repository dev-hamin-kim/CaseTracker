import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

import { TDSMobileAITProvider } from "@toss/tds-mobile-ait"

createRoot(document.getElementById('root')).render(
  <TDSMobileAITProvider>
	  <StrictMode>
      <App />
    </StrictMode>
  </TDSMobileAITProvider>
)
