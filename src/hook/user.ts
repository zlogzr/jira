import { useAsync } from '@/hook/use-async'
import { User } from '@/types/user'
import { cleanObject } from '@/utils'
import { useHttp } from '@/utils/http'
import { useEffect } from 'react'

export const useUsers = (param?: Partial<User>) => {
  const client = useHttp()
  const { run, ...result } = useAsync<User[]>()

  useEffect(() => {
    run(client('users', { data: cleanObject(param || {}) }))
  }, [param, run, client])

  return result
}
