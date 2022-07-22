import * as auth from '@/auth-provider'
import { FullPageErrorFallback, FullPageLoading } from '@/components/lib'
import { useAsync } from '@/hook/use-async'
import { User } from '@/pages/project-list/search-panel'
import { AppDispatch } from '@/store'
import * as authStore from '@/store/auth.slice'
import { bootstrap, selectUser } from '@/store/auth.slice'
import { useMount } from '@/utils'
import { http } from '@/utils/http'
import { ReactNode, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export interface AuthForm {
  username: string
  password: string
}

export const bootstrapUser = async () => {
  let user = null
  const token = auth.getToken()
  if (token) {
    const data = await http('me', { token })
    user = data.user
  }
  return user
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { error, isLoading, isIdle, isError, run } = useAsync<User | null>()
  const dispatch: (...args: unknown[]) => Promise<User> = useDispatch<AppDispatch>()

  useMount(() => {
    run(dispatch(bootstrap()))
  })

  if (isIdle || isLoading) {
    return <FullPageLoading />
  }

  if (isError) {
    return <FullPageErrorFallback error={error} />
  }

  return <div>{children}</div>
}

export const useAuth = () => {
  const dispatch: (...args: unknown[]) => Promise<User> = useDispatch<AppDispatch>()
  const user = useSelector(selectUser)
  const login = useCallback((form: AuthForm) => dispatch(authStore.login(form)), [dispatch])
  const register = useCallback((form: AuthForm) => dispatch(authStore.register(form)), [dispatch])
  const logout = useCallback(() => dispatch(authStore.logout()), [dispatch])
  return {
    user,
    login,
    register,
    logout
  }
}
