import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.tsx'
import { HistoryProvider } from './context/GameContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HistoryProvider>
      <App />
    </HistoryProvider>
  </StrictMode>,
)
