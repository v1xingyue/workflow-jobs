import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { SolanaProvider } from './contexts/SolanaProvider'
import { GillProvider } from './contexts/GillProvider'
import { SOLANA_CONFIG } from './config/solana'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SolanaProvider network={SOLANA_CONFIG.DEFAULT_NETWORK}>
      <GillProvider network={SOLANA_CONFIG.DEFAULT_NETWORK}>
        <App />
      </GillProvider>
    </SolanaProvider>
  </React.StrictMode>,
)

