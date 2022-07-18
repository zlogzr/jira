import { loadDevTools } from 'jira-dev-tool'
import React from 'react'
import ReactDOM from 'react-dom/client'

import 'antd/dist/antd.less'

import App from './App'
import { AppProviders } from './context'

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
