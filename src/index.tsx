import App from './App'
import { AppProviders } from './context'
import { loadDevTools } from 'jira-dev-tool'
import React from 'react'
import ReactDOM from 'react-dom/client'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
loadDevTools(() =>
  root.render(
    <React.StrictMode>
      <AppProviders>
        <App />
      </AppProviders>
    </React.StrictMode>
  )
)
