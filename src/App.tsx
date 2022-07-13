import './App.less'
import { AuthenticatedApp } from '@/authenticated-app/idnex'
import { useAuth } from '@/context/auth-context'
import { UnauthenticatedApp } from '@/unauthenticated-app'

const App = () => {
  const { user } = useAuth()
  return <div className="app">{user ? <AuthenticatedApp /> : <UnauthenticatedApp />}</div>
}

export default App
