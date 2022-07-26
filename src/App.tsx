import { ErrorBoundary } from '@/components/error-boundary'
import { FullPageErrorFallback, FullPageLoading } from '@/components/lib'
import { useAuth } from '@/context/auth-context'
// import AuthenticatedApp from '@/authenticated-app'
// import UnauthenticatedApp from '@/unauthenticated-app'
import { Suspense, lazy } from 'react'

import './App.css'

const AuthenticatedApp = lazy(() => import('@/authenticated-app'))
const UnauthenticatedApp = lazy(() => import('@/unauthenticated-app'))

const App = () => {
  const { user } = useAuth()
  return (
    <div className="app">
      <Suspense fallback={<FullPageLoading />}>
        <ErrorBoundary fallbackRender={FullPageErrorFallback}>
          {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
        </ErrorBoundary>
      </Suspense>
    </div>
  )
}

export default App
