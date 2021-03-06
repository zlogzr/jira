import './wdyr'

import { DevTools, loadServer } from 'jira-dev-tool'
import React from 'react'
import ReactDOM from 'react-dom/client'
// 务必在jira-dev-tool后面引入
import 'antd/dist/antd.less'

import App from './App'
import { AppProviders } from './context'
import { Profiler} from '@/components/profiler'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
loadServer(() =>
  root.render(
    <React.StrictMode>
      <Profiler phases={["mount"]} id={"App Root"}>
        <AppProviders>
          <DevTools />
          <App />
        </AppProviders>
      </Profiler>
    </React.StrictMode>
  )
)
