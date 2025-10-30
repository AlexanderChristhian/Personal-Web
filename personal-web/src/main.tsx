import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { registerServiceWorker } from './utils/sw-register'
import { initWebVitals } from './utils/webVitals'

// Initialize performance monitoring (McMaster-Carr principle)
initWebVitals();

// Register service worker for aggressive caching
if (import.meta.env.PROD) {
  registerServiceWorker();
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
