import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from "shell/auth";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider onLoad='login-required'>
      <App />
    </AuthProvider>
  </StrictMode>,
)
