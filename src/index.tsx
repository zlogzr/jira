import React from 'react'
import ReactDOM from 'react-dom/client'
import { loadDevTools } from 'jira-dev-tool'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
loadDevTools(() =>
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
)

// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// )
