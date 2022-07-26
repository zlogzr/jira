import { ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter as Router } from 'react-router-dom'

import { AuthProvider } from './auth-context'

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider
      client={
        new QueryClient({
          defaultOptions: {
            queries: {
              refetchOnWindowFocus: false
            }
          }
        })
      }
    >
      <Router>
        <AuthProvider>{children}</AuthProvider>
      </Router>
    </QueryClientProvider>
  )
}
