import { Login } from './Login'
import { Register } from './Register'
import { useState } from 'react'

export const UnauthenticatedApp = () => {
  const [isRegister, setIsRegister] = useState(false)
  return (
    <div>
      {isRegister ? <Register /> : <Login />}
      <button onClick={() => setIsRegister(!isRegister)}>
        切换到{isRegister ? '登录' : '注册'}
      </button>
    </div>
  )
}
