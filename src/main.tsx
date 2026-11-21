import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { I18nProvider } from './i18n'
import { Capacitor } from '@capacitor/core'

// Hors ligne de la PWA (issue #12) ; l'APK embarque déjà tout, et le serveur de dev n'en a pas besoin
if (import.meta.env.PROD && 'serviceWorker' in navigator && !Capacitor.isNativePlatform()) {
  navigator.serviceWorker.register('/sw.js').catch(() => {})
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nProvider>
      <App />
    </I18nProvider>
  </StrictMode>,
)
