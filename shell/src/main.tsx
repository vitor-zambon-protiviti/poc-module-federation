import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./styles/globals.css";
import App from './App.tsx'
import { AuthProvider } from './modules/auth/index.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider onLoad='check-sso'>
      <App />
    </AuthProvider>
  </StrictMode>,
)
